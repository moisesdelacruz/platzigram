const express = require('express');
const multer = require('multer');
const ext = require('file-extension');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, + Date.now() + '.' + ext(file.originalname))
  }
})

const upload = multer({ storage: storage }).single('picture');

const port = 3000
const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Platzigram'})
});
app.get('/signup', (req, res) => {
  res.render('index', { title: 'Platzigram - Signup'})
});
app.get('/signin', (req, res) => {
  res.render('index', { title: 'Platzigram - Signin'})
});

// Api
app.get('/api/pictures', (req, res) => {
  var pictures = [
    {
      user: {
        username: 'christinagrimmie',
        avatar: 'https://lh3.googleusercontent.com/-Pl7iWsKpcQw/AAAAAAAAAAI/AAAAAAAAAAA/AHalGhoVSE--jr86LIMqaMSMMhJfBrmR8g/s32-c-mo/photo.jpg'
      },
      url: 'http://materializecss.com/images/sample-1.jpg',
      likes: 0,
      liked: false,
      createdAt: new Date().getTime()
    },
    {
      user: {
        username: 'moisesdelacruz',
        avatar: 'https://lh3.googleusercontent.com/-Pl7iWsKpcQw/AAAAAAAAAAI/AAAAAAAAAAA/AHalGhoVSE--jr86LIMqaMSMMhJfBrmR8g/s32-c-mo/photo.jpg'
      },
      url: 'http://materializecss.com/images/sample-1.jpg',
      likes: 1,
      liked: true,
      createdAt: new Date().setDate(new Date().getDate() - 10)
    },
    {
      user: {
        username: 'demilovato',
        avatar: 'https://lh3.googleusercontent.com/-Pl7iWsKpcQw/AAAAAAAAAAI/AAAAAAAAAAA/AHalGhoVSE--jr86LIMqaMSMMhJfBrmR8g/s32-c-mo/photo.jpg'
      },
      url: 'http://materializecss.com/images/sample-1.jpg',
      likes: 7,
      liked: true,
      createdAt: new Date().setDate(new Date().getDate() - 7)
    }
  ]
  setTimeout(() => {
    res.send(pictures);
  }, 2000)
});

// upload
app.post('/api/pictures', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.send(500, "Error uploading file");
    }
    res.send('File uploaded');
  })
})

app.listen(port, (err) => {
  if (err) console.log(`Server Error: ${err}`), process.exit(1);

  console.log(`Platzigram listen in port: ${port}`);
})
