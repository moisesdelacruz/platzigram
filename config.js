'use strict'

const config = {
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  },
  client: {
    endpoints: {
      pictures: 'http://api.platzigram.com/picture',
      users: 'http://api.platzigram.com/user',
      auth: 'http://api.platzigram.com/auth'
    }
  },
  auth: {
    facebook: {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'http://platzigram.com/auth/facebook/callback'
    }
  },
  secret: process.env.PLATZIGRAM_SECRET || 'pl4tzi',
  platzigramJsonFile: process.env.PLATZIGRAM_FIREBASE_JSON_FILE || './Platzigram-7f712a6a2e77.json'
}

if (process.env.NODE_ENV !== 'production') {
  config.client.endpoints = {
    pictures: 'http://localhost:5000',
    users: 'http://localhost:5001',
    auth: 'http://localhost:5002'
  }

  config.auth.facebook.callbackURL = 'http://platzigram.test:5050/auth/facebook/callback'
}

module.exports = config
