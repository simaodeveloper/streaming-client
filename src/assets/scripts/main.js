/* eslint-disable no-new */

import API from './API';

API.getEpisodes()
    .then(res => console.log(res))

API.getTvShow()
    .then(res => console.log(res))

