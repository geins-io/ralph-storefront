/* eslint-disable prefer-promise-reject-errors */
export default class AuthClient {
  constructor(signpoint, authpoint) {
    if (!signpoint || !authpoint)
      throw new Error('An endpoint that can verify identities is required');
    this.authpoint = authpoint;
    this.signaccount = signpoint;
  }

  connect(username, password, action = 'login') {
    this.token = false;
    this.maxAge = false;

    const credentials = { username };
    const url = this.authpoint + action;
    const isRefresh = !(username && password);
    const fetchOptions = {
      method: isRefresh ? 'GET' : 'POST',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (!isRefresh) {
      fetchOptions.body = JSON.stringify(credentials);
    }

    const addCredentials = async sign => {
      credentials.signature = await this.signaccount(sign);
      if (action === 'password') {
        credentials.password = await this.digest(password.password);
        credentials.newPassword = await this.digest(password.newPassword);
      } else {
        credentials.password = await this.digest(password);
      }
      fetchOptions.body = JSON.stringify(credentials);
    };

    const authConnect = async () => {
      let data = await fetch(url, fetchOptions)
        .then(response => response.json())
        .catch(() => {});
      if (data?.sign) {
        console.log('is signed');
        await addCredentials(data.sign);
        data = await fetch(url, fetchOptions)
          .then(response => response.json())
          .catch(() => {});
        if (data?.token) {
          this.setToken(data);
          console.log('token in second');
        } else {
          console.log('no token for you');
        }
      } else if (data?.token) {
        this.setToken(data);
        console.log('token in first');
      } else {
        console.log('no sign');
      }
    };

    return authConnect();
  }

  setToken(data) {
    this.token = data.token;
    this.maxAge = data.maxAge;
  }

  elevate(message) {
    this.token = false;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.onload = e => {
      if (e.target.responseText) {
        const response = JSON.parse(e.target.responseText);
        if (response.token) this.token = response.token;
      }
    };
    xhr.open('post', this.authpoint + 'authorize');
    xhr.send(message);
  }

  login(username, password) {
    return this.connect(username, password);
  }

  refresh() {
    return this.connect().catch(() => {});
  }

  register(username, password) {
    return this.connect(username, password, 'register');
  }

  changePassword(username, password, newPassword) {
    return this.connect(username, { password, newPassword }, 'password');
  }

  logout() {
    return fetch(this.authpoint + 'logout', {
      cache: 'no-cache',
      credentials: 'include'
    }).then(() => {
      this.token = false;
    });
  }

  async digest(password) {
    const salt =
      'Dd1dfLonNy6Am2fXQl2AcoI+IbhLhXvaibnDNn8uEa6vbJ05eyJajSuGFm9uQSmD';
    const buffer = await crypto.subtle.digest(
      'SHA-384',
      new TextEncoder('utf-8').encode(password + salt)
    );
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  }

  get authorized() {
    return !!this.token;
  }

  get claims() {
    return JSON.parse(atob(this.token.split('.')[1]));
  }

  get serializedClaims() {
    const c = this.claims;
    let r = '';
    for (const n in c)
      if (c[n].push) for (const i in c[n]) r += ';' + n + '=' + c[n][i];
      else r += ';' + n + '=' + c[n];
    return r.substr(1);
  }

  get(endpoint) {
    return this.sendRequest('get', endpoint);
  }

  put(endpoint, data) {
    return this.sendRequest('put', endpoint, data);
  }

  post(endpoint, data) {
    return this.sendRequest('post', endpoint, data);
  }

  sendRequest(method, endpoint, data) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open(method, endpoint);

      if (this.authorized && !XMLHttpRequest.prototype.origOpen)
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.token);

      xhr.onload = () => {
        let payload = xhr.responseText;
        try {
          payload = JSON.parse(payload);
        } catch {}

        if (xhr.getAllResponseHeaders().includes('authorization'))
          this.elevate(xhr.getResponseHeader('authorization'));

        if (xhr.status === 200) resolve(payload);
        reject(payload);
      };

      if (data) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      } else xhr.send();
    });
  }
}
