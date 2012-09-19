var assert = require('assert')
var sinon = require('sinon')
var Index = require('../../../app/controllers/index')
var tf = require('../../fixtures')


describe('index', function() {
  describe('root', function() {
    it('should render the index template', function(done) {
      var options = tf.getControllerOptions()

      options.route.action = 'home'

      options.res.render = function() {
        assert(options.res.render.calledOnce)
        assert(options.res.render.calledWith('index'))
        done()
      }

      sinon.spy(options.res, 'render')

      new Index(options)
    })
  })
})