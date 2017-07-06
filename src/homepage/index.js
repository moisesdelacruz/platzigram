const page = require('page');
const empty = require('empty-element');
const template = require('./template');
const title = require('title');
const request = require('superagent');
const axios = require('axios');
const header = require('../header');
const Webcam = require('webcamjs');

page('/', header, loading, loadPictures, (ctx, next) => {
  title('Platzigram');
  const main = document.getElementById('main-container');

  empty(main).appendChild(template(ctx.pictures));

  const picturePreview = document.getElementById('picture-preview')
  const camaraInput = document.getElementById('camara-input')
  const cancelPicture = $('#cancelPicture');
  const shootButton = $('#shoot');
  const uploadButton = $('#uploadButton');

  function reset() {
    picturePreview.classList.add('hide');
    camaraInput.classList.remove('hide');
    cancelPicture.addClass('hide');
    shootButton.removeClass('hide');
    uploadButton.addClass('hide');
  }

  cancelPicture.click(reset);

  $('.modal').modal({
    ready: function () {
      Webcam.attach('#camara-input');
      shootButton.click(() => {
        Webcam.snap((data_uri) => {
          picturePreview.innerHTML = `<img src="${data_uri}"/>`;
          picturePreview.classList.remove('hide');
          camaraInput.classList.add('hide');
          cancelPicture.removeClass('hide');
          shootButton.addClass('hide');
          uploadButton.removeClass('hide')
          uploadButton.off('click')
          uploadButton.click(() => {
            const pic = {
              url: data_uri,
              likes: 0,
              liked: false,
              createdAt: +new Date(),
              user: {
                avatar: "https://scontent-atl3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11031148_10153448564292612_2579019413701631604_n.jpg?oh=d83cdd0687c87c91b247a42375fc5a57&oe=57B12767",
                username: "slifszyc"
              }
            }
            $('#picture-cards').prepend(picture(pic));
            reset();
            $('#modalCamara').modal('close');
          });
        });
      })
    },
    complete: function () {
      Webcam.reset();
    }
  });
});

function loading (ctx, next) {
  var el = document.createElement('div');
  el.classList.add('loader');
  document.getElementById('main-container').appendChild(el);
  next();
}

// with async await function
async function loadPictures (ctx, next) {
  try {
    ctx.pictures = await fetch('/api/pictures').then(res => res.json());
    next();
  } catch (err) {
    return console.log(err);
  }
}

// // with Fetch
// function loadPictures (ctx, next) {
//   fetch('/api/pictures')
//     .then((res) => {
//       return res.json();
//     })
//     .then((pictures) => {
//       ctx.pictures = pictures;
//       next();
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// }

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
