const yo = require('yo-yo');
const landing = require('../landing');
const translate = require('../translate');

const signinForm = yo`<div class="col s12 m7">
  <div class="row">
    <div class="signup-box">
      <h1 class="platzigram">Platzigram</h1>
      <form class="signup-form" action="/login" method="POST">
        <div class="section">
          <a href="/auth/facebook" rel="external" class="btn btn-fb hide-on-small-only">${translate.message('signup.facebook')}</a>
          <a href="/auth/facebook" rel="external" class="btn btn-fb hide-on-med-and-up"><i class="fa fa-facebook-official"></i> signup.text</a>
        </div>
        <div class="divider"></div>
        <div class="section">
          <input type="text" name="username" placeholder="${translate.message('username')}" />
          <input type="password" name="password" placeholder="${translate.message('password')}" />
          <button type="submit" class="btn waves-effect waves-light btn-signup">${translate.message('signup.text')}</button>
        </div>
      </form>
    </div>
  </div>
  <div class="row">
    <div class="login-box">
      ${translate.message('signin.not-have-account')} <a href="/signup">${translate.message('signup.call-to-action')}</a>
    </div>
  </div>
</div>`

module.exports = landing(signinForm)
