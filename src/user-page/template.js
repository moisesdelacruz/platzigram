import yo from 'yo-yo'
import layout from '../layout'
import translate from '../translate'

export default function userPageTemplate (user) {
  const el = yo`<div class="container user-page">
    <div class="row">
      <div class="col s12 m10 offset-m1 l8 offset-l2 center-align hadding">
        <div class="row">
          <div class="col s12 m10 offset-m1 l3 offset-l3 center-align">
            <img
              src="${user.avatar}"
              class="responsive-img circle"
            />
          </div>
          <div class="col s12 m10 offset-m1 l6 left-align">
            <h2 class="hide-on-large-only center-align">${user.username}</h2>
            <h2 class="hide-on-med-and-down center-align">${user.username}</h2>
          </div>
        </div>
      </div>
      <div class="row">
        ${user.pictures.map(picture => {
          return yo`<div class="col s12 m6 l4">
            <div class="picture-container">
              <img src="${picture.src}" class="picture" />
              <div class="likes">
                <i class="fa fa-heart" aria-hidden=true></i>
                ${picture.likes}
              </div>
            </div>
          </div>`
        })}
      </div>
    </div>
  </div>`;
  return layout(el);
}
