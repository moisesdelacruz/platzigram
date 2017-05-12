const page = require('page');
const empty = require('empty-element');
const template = require('./template');
const title = require('title');

page('/', (ctx, next) => {
  title('Platzigram');
  const main = document.getElementById('main-container');

  var pictures = [
    {
      user: {
        username: 'christinagrimmie',
        avatar: 'https://lh3.googleusercontent.com/-Pl7iWsKpcQw/AAAAAAAAAAI/AAAAAAAAAAA/AHalGhoVSE--jr86LIMqaMSMMhJfBrmR8g/s32-c-mo/photo.jpg'
      },
      url: 'http://materializecss.com/images/sample-1.jpg',
      likes: 152,
      liked: false
    },
    {
      user: {
        username: 'moisesdelacruz',
        avatar: 'https://lh3.googleusercontent.com/-Pl7iWsKpcQw/AAAAAAAAAAI/AAAAAAAAAAA/AHalGhoVSE--jr86LIMqaMSMMhJfBrmR8g/s32-c-mo/photo.jpg'
      },
      url: 'office.jpg',
      likes: 1024,
      liked: true
    }
  ]
  empty(main).appendChild(template(pictures));
});
