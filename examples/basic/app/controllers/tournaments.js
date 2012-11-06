var Controller = require('./base')

var Tournaments = module.exports = Controller.extend({

  index: function(done) {
    this.template = 'tournaments/index'
    done()
  },

  create: function(done) {
    done()
  },

  show: function(done) {
    this.template = 'tournaments/overview'
    done()
  },

  update: function(done) {
    this.model = {}
    done()
  },

  destroy: function(done) {
    done()
  }

})
