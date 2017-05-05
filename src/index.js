const page = require('page');

const main = document.getElementById('main-container');

page('/', (ctx, next) => {
  main.innerHTML = 'Home <a href="/signup">Signup</a>';
});

page('/signup', (ctx, next) => {
  main.innerHTML = 'Signup <a href="/">Home</a>';
});

page();
