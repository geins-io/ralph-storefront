/* eslint-disable prefer-promise-reject-errors */
export default class AuthClient {
  constructor(signpoint, authpoint) {
    if (!signpoint || !authpoint)
      throw new Error('An endpoint that can verify identities is required');
    this.authpoint = authpoint;
    this.signaccount = signpoint;
  }

  setTokenData(data) {
    this.token = data.token;
    this.maxAge = data.maxAge;
  }

  connect(username, password, action = 'login') {
    this.setTokenData({ token: false, maxAge: false });

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
        await addCredentials(data.sign);

        data = await fetch(url, fetchOptions)
          .then(response => response.json())
          .catch(() => {});

        if (data?.token) {
          this.setTokenData(data);
        }
      } else if (data?.token) {
        this.setTokenData(data);
      }
    };

    return authConnect();
  }

  login(username, password) {
    return this.connect(username, password);
  }

  refresh() {
    return this.connect();
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
      this.setTokenData({ token: false, maxAge: false });
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
    return this.sendRequest('GET', endpoint);
  }

  sendRequest(method, endpoint) {
    return fetch(endpoint, {
      method,
      cache: 'no-cache'
    })
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }
}
