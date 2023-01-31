
const modules = require('../modules');
const router = require('../modules/User/UserController');

const initialize = (app) => {

  modules.core.forEach(mod => {
    let endpoint = mod.provider.Endpoint;
    let controller = mod.provider.Controller;

    app.use(endpoint, controller);
  });
}
module.exports = { initialize }