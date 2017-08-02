const yo = require('yo-yo');
const translate = require('../translate');

module.exports = function (pic) {
  var el;

  function render (picture) {
    return yo`<div class="card ${picture.liked ? 'liked' : ''}">
      <div class="card-image">
        <img class="activator" src="${picture.src}" ondblclick=${like.bind()}/>
        <i class="fa fa-heart like-heart ${picture.likedHeart ? 'liked' : ''}" aria-hidden="true"></i>
      </div>
      <div class="card-content">
        <a href="/${picture.user.username}" class="card-title" >
          <img src="${picture.user.avatar}" class="avatar" />
          <span class="username">${picture.user.name}</span>
        </a>
        <small class="right time">${translate.date.format(new Date(picture.createdAt).getTime())}</small>
        <p>
          <a href="#" onclick=${like.bind()} class="left"><i class="fa fa-heart-o" aria-hidden="true"></i></a>
          <a href="#" onclick=${like.bind()} class="left"><i class="fa fa-heart" aria-hidden="true"></i></a>
          <span class="left likes">${translate.message('likes', { likes: picture.likes || 0 })}</span>
        </p>
      </div>
    </div>`
  }

  function like (ev) {
    if (ev.type === "dblclick") {
      pic.likedHeart = !pic.liked;
    }
    pic.liked = !pic.liked;
    pic.likes += pic.liked ? 1 : -1;

    function doRender () {
      var newEl = render(pic);
      yo.update(el, newEl);
    }

    doRender();

    setTimeout(() => {
      pic.likedHeart = false;
      doRender();
    }, 1000)
    return false;
  }

  el = render(pic);
  return el;
}
