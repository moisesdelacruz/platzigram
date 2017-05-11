const yo = require('yo-yo');
const landing = require('../landing')

const signinForm = yo`<div class="col s12 m7">
  <div class="row">
    <div class="signup-box">
      <h1 class="platzigram">Platzigram</h1>
      <form class="signup-form">
        <h2>Registrate para ver fotos de tus amigos estudiando en platzi</h2>
        <div class="section">
          <a class="btn btn-fb hide-on-small-only" href="#facebook">Iniciar sesión con Facebook</a>
          <a class="btn btn-fb hide-on-med-and-up" href="#facebook"><i class="fa fa-facebook-official"></i> Iniciar sesión</a>
        </div>
        <div class="divider"></div>
        <div class="section">
          <input type="text" name="username" placeholder="Nombre de usuario" />
          <input type="password" name="password" placeholder="Contraseña" />
          <button type="submit" class="btn waves-effect waves-light btn-signup">Inicia Sesión</button>
        </div>
      </form>
    </div>
  </div>
  <div class="row">
    <div class="login-box">
      ¿No tienes una cuenta? <a href="/signup">Regístrate</a>
    </div>
  </div>
</div>`

module.exports = landing(signinForm)
