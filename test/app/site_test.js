var assert = require('assert')
var sinon = require('sinon')
var site = require('../../app/site')
var tf = require('../fixtures')


describe('Site', function() {
  describe('request setup', function() {
    var req = tf.getBareRequest()
    var res = tf.getBareResponse()

    site(req, res)

    it('should add logger to request and response objects', function(done) {
      assert(req.log)
      assert(res.log)
      done()
    })

    it('should add templating to response object', function(done) {
      assert(res.render)
      done()
    })

    it('should add error handling to response object', function(done) {
      assert(res.error)
      done()
    })

    it('should add ngin client to request and response objects', function(done) {
      assert(req.ngin)
      assert(res.ngin)
      done()
    })

  })

})