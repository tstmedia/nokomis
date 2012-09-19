var Controller = require('../../index').Controller

var Main = module.exports = Controller.extend({

  template: 'main',

  initialize: function(options) {
    this.model = {
      text: 'Hello World'
    }
    options.done()
  }

})
