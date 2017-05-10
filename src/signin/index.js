const page = require('page');
const empty = require('empty-element');
const template = require('./template');
const title = require('title');

page('/signin', (ctx, next) => {
  title('Platzigram - Signin');
  const main = document.getElementById('main-container');
  empty(main).appendChild(template);
});
