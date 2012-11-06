var App = require('nokomis').App
var routes = require('./routes')

var MyApp = App.extend({

  initialize: function(options) {
    // add any initialization logic here
  },

  setupRoutes: routes

})

module.exports = MyApp
