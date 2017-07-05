const yo = require('yo-yo');
const layout = require('../layout');
const picture = require('../picture-card');
const translate = require('../translate').message;
const request = require('superagent');

module.exports = function (pictures) {
  var el = yo`<div class="container timeline">
    <div  class="row">
      <div class="col s12 m10 offset-m1 l8 offset-l2 center-align">
        <form enctype="multipart/form-data" class="form-upload" id="formUpload" onsubmit=${onsubmit}>
          <div id="fileName" class="fileUpload btn btn-flat cyan">
            <span>
              <i class="fa fa-camera" aria-hidden="true"></i>
              ${translate('upload-pictures')}
            </span>
            <input type="file" id="file" name="picture" class="upload" accept="image/*" onchange=${onchange} />
          </div>
          <button type="submit" id="btnUpload" class="btn btn-flat cyan hide">
            ${translate('upload')}
          </button>
          <button type="button" id="btnCancel" class="btn btn-flat red hide" onclick=${cancel}>
            <i class="fa fa-times" aria-hidden="true"></i>
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col s12 m10 offset-m1 l6 offset-l3">
        ${pictures.map((pic) => {
          return picture(pic);
        })}
      </div>
    </div>
  </div>`;

  function toggleButtons () {
    document.getElementById('fileName').classList.toggle('hide');
    document.getElementById('btnUpload').classList.toggle('hide');
    document.getElementById('btnCancel').classList.toggle('hide');
  }

  function cancel () {
    toggleButtons();
    document.getElementById('formUpload').reset();
  }

  function onchange () {
    toggleButtons();
  }

  function onsubmit (ev) {
    ev.preventDefault();
    var data = new FormData(this);
    request
      .post('/api/pictures')
      .send(data)
      .end((err, res) => {
        console.log(arguments);
        cancel();
      });
  }
  return layout(el)
}
