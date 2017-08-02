const express = require('express');
const multer = require('multer');
const ext = require('file-extension');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const multer_gcloud = require('multer-gcloud');
const passport = require('passport');
const platzigram = require('platzigram-client');
const auth = require('./auth');
const config = require('./config');
const port = process.env.PORT || 5050;

const client = platzigram.createClient(config.client);

var gcloud = require('@google-cloud/storage')({
  projectId: config.firebase.projectId,
  keyFilename: config.platzigramJsonFile
});

var bucket = gcloud.bucket(config.firebase.storageBucket);

const storage = multer_gcloud({
  storage_bucket: config.firebase.storageBucket,
  bucket: bucket,
  metadata: function (req, file, cb) {
    cb(null, file.mimetype);
  },
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, + Date.now() + '.' + ext(file.originalname));
  }
});

const upload = multer({ storage: storage }).single('picture');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'pug');
app.use(express.static('public'));

passport.use(auth.localStrategy);
passport.use(auth.facebookStrategy);
passport.deserializeUser(auth.deserializeUser);
passport.serializeUser(auth.serializeUser);

app.get('/', (req, res) => {
  res.render('index', { title: 'Platzigram'})
});
app.get('/signup', (req, res) => {
  res.render('index', { title: 'Platzigram - Signup'})
});

app.post('/signup', (req, res) => {
  var user = req.body;
  client.saveUser(user, (err, usr) => {
    if (err) {
      console.log(typeof user);
      console.log(user);
      return res.status(500).send(err.message);
    }

    res.redirect('/signin');
  })
})
app.get('/signin', (req, res) => {
  res.render('index', { title: 'Platzigram - Signin'})
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signin'
}));

app.get('/logout', (req, res) => {
  req.logout();

  res.redirect('/');
});

app.get('/auth/facebook', passport.authenticate('facebook', {
  scope: 'email'
}));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/signin'
}))

function ensureAuth (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).send({ error: 'not authenticated' });
}

app.get('/whoami', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user);
  }

  res.json({ auth: false });
});

// Api
app.get('/api/pictures', (req, res) => {
  client.listPictures((err, pictures) => {
    if (err) return res.send([]);

    res.send(pictures);
  });
});

app.post('/api/pictures', ensureAuth, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).send(`Error uploading file: ${err.message}`);
    }

    var user = req.user;
    var token = req.user.token;
    var username = req.user.username;
    var src = req.file.location;
    client.savePicture({
      src: src,
      userId: username,
      user: {
        username: username,
        avatar: user.avatar,
        name: user.name
      }
    }, token, (err, img) => {
      if (err) return res.status(500).send(err.message);
      return res.send(`File uploaded: ${req.file.location}`);
    });
  });
});

// api user
app.get('/api/user/:username', (req, res) => {
  var username = req.params.username;

  client.getUser(username, (err, user) => {
    if (err) return res.status(404).send({ error: 'user not found' });

    res.send(user);
  });
});

// user page
app.get('/:username', (req, res) => {
  res.render('index', { title: `Platzigram - ${req.params.username}`})
});

app.get('/:username/:id', (req, res) => {
  res.render('index', { title: `Platzigram - ${req.params.username}`})
});

app.listen(port, (err) => {
  if (err) {
    console.error(`Server Error: ${err}`);
    process.exit(1);
  }

  console.log(`Platzigram listen in port: ${port}`);
})
