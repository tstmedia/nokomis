
var config = require('./config')
var routes = require('./routes')
var middleware = require('./middleware')

// set the root directory for the app
config.appRoot = __dirname

var App = require('../index').App

var TestApp = App.extend({

  initialize: function(options) {

  },

  setupRoutes: routes,
  setupMiddleware: middleware

})

module.exports = TestApp
