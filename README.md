# Platzigram a module created by [Platzi][platzi] in the [professional course Nodejs][course].

This app is a Instagram copy created with educational purposes.

## Requirements:
* Firebase Cloud: https://firebase.google.com/
* Was must create a `Service Account Keys` https://console.cloud.google.com/
* Facebook OAuth2: https://developers.facebook.com/
* Config [Environment Variables][env_vars].

## Install:
```sh
  $ git clone https://github.com/moisesdelacruz/platzigram.git

  $ cd platzigram/

  $ npm install
```

## Environment Variables:
```sh
  # firebase
  FIREBASE_API_KEY
  FIREBASE_AUTH_DOMAIN
  FIREBASE_DATABASE_URL
  FIREBASE_PROJECT_ID
  FIREBASE_STORAGE_BUCKET
  FIREBASE_MESSAGING_SENDER_ID

  # facebook
  FACEBOOK_CLIENT_ID
  FACEBOOK_CLIENT_SECRET

  # Other
  PLATZIGRAM_SECRET="";
  PLATZIGRAM_FIREBASE_JSON_FILE=""
  NODE_ENV="dev"
```

[platzigram-api]: <https://github.com/moisesdelacruz/platzigram-db>
[platzigram-api]: <https://github.com/moisesdelacruz/platzigram-api>
[platzigram-api]: <https://github.com/moisesdelacruz/platzigram-client>
[platzigram]: <https://github.com/moisesdelacruz/platzigram>
[platzi]: <https://platzi.com/>
[course]: <https://platzi.com/clases/node/>

[env_vars]: <#environment-variables>
