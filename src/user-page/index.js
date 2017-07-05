import page from 'page'
import header from '../header'
import title from 'title'
import empty from 'empty-element'
import template from './template'

page('/:username', header, loadUser, (ctx, next) => {
  renderUserPage(ctx);
});

page('/:username/:id', header, loadUser, (ctx, next) => {
  renderUserPage(ctx);
  $(`#modal${ctx.params.id}`).modal('open');
});

function renderUserPage (ctx) {
  var main = document.getElementById('main-container');
  title(`Platzigram - ${ctx.params.username}`);
  empty(main).appendChild(template(ctx.user));
  $('.modal').modal({
    complete: function () {
      page(`/${ctx.params.username}`)
    }
  });
}

async function loadUser (ctx, next) {
  try {
    ctx.user = await fetch(`/api/user/${ctx.params.username}`).then(res => res.json());
    next();
  } catch (err) {
    console.log(err);
  }
}
