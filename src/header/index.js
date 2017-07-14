const yo = require('yo-yo');
const translate = require('../translate');
const empty = require('empty-element');

var authCard = function (ctx) {
  var authenticated = yo`
    <div class="col s4 m2 push-s8 push-m4">
      <a href="#" class="btn btn-large btn-flat dropdown-button" data-activates="drop-user">
        <i class="fa fa-user" aria-hidden="true"></i>
        ${ctx.auth.name}
      </a>
      <ul id="drop-user" class="dropdown-content">
        <li><a href="/logout" rel="external">${translate.message('logout')}</a></li>
      </ul>
    </div>`

  var signin = yo`
    <div class="col s4 m2 push-s8 push-m4">
      <a href="/signin" class="btn btn-large btn-flat">
        ${translate.message('signin')}
      </a>
    </div>`

  if (ctx.auth) {
    return authenticated
  } else {
    return signin
  }
}

var renderHeader = function (ctx) {
  return yo`<nav class="header">
    <div class="nav-wrapper">
      <div class="container">
        <div class="row">
          <div class="col s8 m6 offset-s1">
            <a href="/" class="brand-logo platzigram">Platzigram</a>
          </div>
          ${authCard(ctx)}
        </div>
      </div>
    </div>
  </nav>`
}

module.exports = function (ctx, next) {
  let container = document.getElementById('header-container');
  empty(container).appendChild(renderHeader(ctx));
  next();
}
