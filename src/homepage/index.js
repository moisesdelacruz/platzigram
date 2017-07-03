const page = require('page');
const empty = require('empty-element');
const template = require('./template');
const title = require('title');
const request = require('superagent');
const axios = require('axios');
const header = require('../header');

page('/', header, loadPictures, (ctx, next) => {
  title('Platzigram');
  const main = document.getElementById('main-container');

  empty(main).appendChild(template(ctx.pictures));
});

// with Fetch
function loadPictures (ctx, next) {
  fetch('/api/pictures')
    .then((res) => {
      return res.json();
    })
    .then((pictures) => {
      ctx.pictures = pictures;
      next();
    })
    .catch((err) => {
      console.log(err);
    })
}

// with Axios
// function loadPictures (ctx, next) {
//   axios
//     .get('/api/pictures')
//     .then((res) => {
//       ctx.pictures = res.data;
//       next();
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// }

// with Superagent
// function loadPictures (ctx, next) {
//   request
//     .get('/api/pictures')
//     .end((err, res) => {
//       if (err) return console.log(err);
//
//       ctx.pictures = res.body;
//       next();
//     });
// }
