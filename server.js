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
  res.send(pictures);
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

// api user
app.get('/api/user/:username', (req, res) => {
  const user = {
    username: 'moisesdelacruz',
    avatar: 'https://lh3.googleusercontent.com/-Pl7iWsKpcQw/AAAAAAAAAAI/AAAAAAAAAAA/AI6yGXxb4xaYgY0ZgjYFPxTTClmyGpimTA/s360-c-mo/photo.jpg',
    pictures: [
      {
        id: 1,
        src: 'https://ig-s-d-a.akamaihd.net/hphotos-ak-xta1/t51.2885-15/e35/19121809_1083379801763051_513145976513363968_n.jpg',
        likes: 76
      },
      {
        id: 2,
        src: 'https://ig-s-d-a.akamaihd.net/hphotos-ak-xta1/t51.2885-15/e35/19122467_108485429765915_7999280866863874048_n.jpg',
        likes: 75456
      },
      {
        id: 3,
        src: 'https://ig-s-c-a.akamaihd.net/hphotos-ak-xta1/t51.2885-15/e35/19228440_1576739362349170_6961720573214851072_n.jpg',
        likes: 74
      },
      {
        id: 4,
        src: 'https://ig-s-b-a.akamaihd.net/hphotos-ak-xta1/t51.2885-15/e35/19121547_716980611841893_499119682771484672_n.jpg',
        likes: 65
      },
      {
        id: 5,
        src: 'https://ig-s-c-a.akamaihd.net/hphotos-ak-xta1/t51.2885-15/e35/19122071_283526405451990_6801421377137016832_n.jpg',
        likes: 9
      }
    ]
  }
  res.send(user);
})

// user page
app.get('/:username', (req, res) => {
  res.render('index', { title: `Platzigram - ${req.params.username}`})
});

app.listen(port, (err) => {
  if (err) console.log(`Server Error: ${err}`), process.exit(1);

  console.log(`Platzigram listen in port: ${port}`);
})
