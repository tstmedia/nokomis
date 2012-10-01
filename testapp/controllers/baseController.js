var Controller = require('../../index').Controller

var BaseController = module.exports = Controller.extend({

  initialize: function(options) {
    this.model = {
      text: 'Hello World'
    }
    options.done()
  }

})

BaseController.addPlugin()
