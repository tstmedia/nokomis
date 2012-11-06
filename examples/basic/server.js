var config = require('./config')
var App = require('nokomis').App

// set the root directory for the app
config.appRoot = __dirname

// start the app with the provided worker script
config.worker = config.appRoot + '/app/worker.js'

App.start(config)
