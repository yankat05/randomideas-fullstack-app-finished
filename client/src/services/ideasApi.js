import axios from 'axios';

class IdeasApi {
  constructor() {
    this._apiUrl = '/api/ideas';
  }

  getIdeas() {
    return axios.get(this._apiUrl);
    // this returns a promise.
  }

  createIdea(data) {
    return axios.post(this._apiUrl, data); // that data's gonna comme from the form., this one returns a promise., with post(the url, the data)
  }

  updateIdea(id, data) {
    return axios.put(`${this._apiUrl}/${id}`, data);
  }

  deleteIdea(id) {
    const username = localStorage.getItem('username') ? localStorage.getItem('username') : '';
    return axios.delete(`${this._apiUrl}/${id}`, {
      data: {
        username
      }
    })
  }
}

export default new IdeasApi();

