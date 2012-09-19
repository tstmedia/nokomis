
var config = require('./config')
var App = require('../index').App

// set the root directory for the app
config.appRoot = __dirname

// start the app with the provided worker script
config.worker = config.appRoot + '/worker.js'

App.start(config)
