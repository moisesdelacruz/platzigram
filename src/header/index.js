const yo = require('yo-yo');
const translate = require('../translate');
const empty = require('empty-element');

var el = yo`<nav class="header">
  <div class="nav-wrapper">
    <div class="container">
      <div class="row">
        <div class="col s8 m6 offset-s1">
          <a href="/" class="brand-logo platzigram">Platzigram</a>
        </div>
        <div class="col s4 m2 push-s8 push-m4">
          <a href="#" class="btn btn-large btn-flat dropdown-button" data-activates="drop-user">
            <i class="fa fa-user" aria-hidden="true"></i>
          </a>
          <ul id="drop-user" class="dropdown-content">
            <li><a href="#">${translate.message('logout')}</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</nav>`

module.exports = function (ctx, next) {
  let container = document.getElementById('header-container');
  empty(container).appendChild(el);
  next();
}
