var Controller = require('./base')

var Home = module.exports = Controller.extend({

  index: function(done) {
    this.template = 'home/index'
    done()
  }

})
