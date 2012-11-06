var nokomis = require('nokomis')
var Controller = nokomis.Controller
var plugins = require('nokomis-plugins')

var config = require('../../config')

var BaseController = module.exports = Controller.extend({

  initialize: function(options) {
  }

})

// Add Plugins
// These plugins are all included in nokomis-plugins on npm
BaseController.addPlugin(plugins.Logging, config.logging)
BaseController.addPlugin(plugins.ContentNegotiator)
BaseController.addPlugin(plugins.Cookies, config.cookies)
BaseController.addPlugin(plugins.Session, config.session)
BaseController.addPlugin(plugins.Errors, config.errorPage)
BaseController.addPlugin(plugins.Timeout, config.timeout)
BaseController.addPlugin(plugins.Respond)
BaseController.addPlugin(plugins.PostData)

// add more/custom plugins here
