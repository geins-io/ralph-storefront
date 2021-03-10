/* eslint-disable prefer-promise-reject-errors */
export default class AuthClient {
  constructor(signpoint, authpoint) {
    if (!signpoint || !authpoint)
      throw new Error('An endpoint that can verify identities is required');
    this.authpoint = authpoint;
    this.signaccount = signpoint;
  }

  login(username, password, newUser) {
    this.token = false;
    this.maxAge = false;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const data = { username };
      xhr.withCredentials = true;
      xhr.onload = async e => {
        if (e.target.responseText) {
          const response = JSON.parse(e.target.responseText);
          console.log('response', response);
          if (response.sign) {
            data.signature = await this.signaccount(response.sign);
            data.password = await this.digest(password);

            xhr.open('post', this.authpoint + (newUser ? 'register' : 'login'));
            xhr.send(JSON.stringify(data));
            return;
          }

          if (response.token) {
            this.token = response.token;
            this.maxAge = response.maxAge;
            // setTimeout(() => {
            //   if (this.authorized) this.login().catch(() => {});
            // }, response.maxAge * 900);
            resolve();
            return;
          }

          reject(e.target.responseText);
        } else reject();
      };

      if (username && password) {
        xhr.open('post', this.authpoint + (newUser ? 'register' : 'login'));
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      } else {
        xhr.open('get', this.authpoint + 'login');
        xhr.send();
      }
    });
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

  refresh() {
    return this.login().catch(() => {});
  }

  register(username, password) {
    return this.login(username, password, true);
  }

  logout() {
    this.token = false;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('get', this.authpoint + 'logout');
    xhr.send();
  }

  setGlobalAuthHeader(enabled) {
    if (enabled) {
      const _this = this;
      XMLHttpRequest.prototype.origOpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function() {
        this.origOpen.apply(this, arguments);
        this.setRequestHeader('Authorization', 'Bearer ' + _this.token);
      };
    } else if (XMLHttpRequest.prototype.origOpen !== undefined) {
      XMLHttpRequest.prototype.open = XMLHttpRequest.prototype.origOpen;
      delete XMLHttpRequest.prototype.origOpen;
    }
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
