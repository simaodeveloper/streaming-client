class API {

  constructor() {
    this.baseUrl = 'https://sample-api-78c77.firebaseio.com/';
  }

  getTvShow(show = 'SHOW123') {
    return fetch(`${this.baseUrl}/tv-shows/${show}.json`)
      .then(data => data.json());
  }

  getEpisodes(show = 'SHOW123') {
    return fetch(`${this.baseUrl}/episodes/${show}.json`)
      .then(data => data.json());
  }
}

export default new API();
