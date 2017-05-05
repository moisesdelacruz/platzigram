const page = require('page');

page('/', (ctx, next) => {
  const main = document.getElementById('main-container');
  main.innerHTML = '<a href="/signup">Signup</a>';
});
