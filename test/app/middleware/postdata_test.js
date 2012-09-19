var assert = require('assert')
var sinon = require('sinon')
var site = require('../../../app/site')
var tf = require('../../fixtures')


describe('Middleware > postdata', function() {

  describe('request body event', function() {
    var req = tf.getBareRequest()
    var res = tf.getBareResponse()

    it('should emit for body event on req', function(done) {
      req.on('body', function(data) {
        assert(data)
        done()
      })
      site(req, res)
    })
  })

  describe('request data form method', function() {
    var req = tf.getBareRequest()
    var res = tf.getBareResponse()

    req.headers['content-type'] = 'application/x-www-form-urlencoded'
    site(req, res)

    it('should exist', function(done) {
      assert(req.data.form)
      done()
    })

    it('should retrieve form data', function(done) {
      req.data.form(function(err, data) {
        assert.ifError(err)
        assert(data)
        done()
      })
    })
  })

  describe('request data json method', function() {
    var req = tf.getBareRequest()
    var res = tf.getBareResponse()

    req.headers['content-type'] = 'application/json'
    site(req, res)

    it('should exist', function(done) {
      assert(req.data.json)
      done()
    })

    it('should retrieve json data', function(done) {
      req.data.json(function(err, data) {
        assert.ifError(err)
        assert(data)
        done()
      })
    })
  })

})