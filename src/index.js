require("babel-polyfill");
const page = require('page');

require('./homepage');
require('./signup');
require('./signin');
require('./user-page');
require('./footer');

page();
