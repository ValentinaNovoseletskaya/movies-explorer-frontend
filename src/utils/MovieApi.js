class MovieApi {
    constructor(baseUrl, headers) {
      this._headers = headers;
      this._baseUrl = baseUrl;
    }
    
    _request(url, options) {
      return fetch(url, options).then(this.resolveFetch)
    }

    resolveFetch(res) {
      if (res.ok) { 
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    }

    getMovies() {
      return this._request(`${this._baseUrl}/beatfilm-movies`, {
        headers: this._headers
      });
    }
}

const headers = {
    "Content-Type": "application/json"
};
  
const baseUrl = 'https://api.nomoreparties.co';

export const movieApi = new MovieApi(baseUrl, headers);