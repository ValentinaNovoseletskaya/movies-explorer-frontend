class MainApi {
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

    signin(data) {
      return this._request(`${this._baseUrl}/signin`, {
        method: "POST",
        body: JSON.stringify(data),
        credentials: 'include',
        headers: this._headers
      });
    }

    signup(data) {
        return this._request(`${this._baseUrl}/signup`, {
          method: "POST",
          body: JSON.stringify(data),
          credentials: 'include',
          headers: this._headers
        });
    }

    getUserInfo() {     
      return this._request(`${this._baseUrl}/users/me`, {
        credentials: 'include',
        headers: this._headers
      });
    } 

    editUserInfo(data) {
      return this._request(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        body: JSON.stringify(data),
        credentials: 'include',
        headers: this._headers
      });
    }
 
    getSavedMovie() {     
        return this._request(`${this._baseUrl}/movies`, {
          credentials: 'include',
          headers: this._headers
        });
    } 

    addMovie(data) {
        return this._request(`${this._baseUrl}/movies`, {
          method: "POST",
          body: JSON.stringify(data),
          credentials: 'include',
          headers: this._headers
        });
    }

    removeMovie(movieId) {
        return this._request(`${this._baseUrl}/movies/${movieId}`, {
          method: "DELETE",
          credentials: 'include',
          headers: this._headers
        });
    }
}

const headers = {
    "Content-Type": "application/json"
};
  
const baseUrl = 'https://api.moviexplore.nomoredomainsrocks.ru';

export const mainApi = new MainApi(baseUrl, headers);