const express = require('express');

const port = 3000
const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', (req, res) => res.render('index', { title: 'Platzigram'}));
app.get('/signup', (req, res) => res.render('index', { title: 'Platzigram - Signup'}));
app.get('/signin', (req, res) => res.render('index', { title: 'Platzigram - Signin'}));

app.listen(port, (err) => {
  if (err) console.log(`Server Error: ${err}`), process.exit(1);

  console.log(`Platzigram listen in port: ${port}`);
})
