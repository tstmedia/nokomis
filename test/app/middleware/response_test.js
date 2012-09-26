var assert = require('assert')
var sinon = require('sinon')
var response = require('../../../app/middleware/response')
var tf = require('../../fixtures')
var config = require('../../../config')


describe('Middleware > response', function() {

  describe('send', function() {
    var req = tf.getBareRequest()
    var res = tf.getBareResponse()
    var data = 'Teamcenter!!'
    var headers = { 'somekey':'someval' }

    response(req, res, config)

    it('should add send helper', function(done) {
      assert(res.send)
      done()
    })

    it('should set content-length header', function(done) {
      res.send(data)
      assert(res.setHeader.calledWith('content-length', data.length))
      done()
    })

    it('should set provided headers', function(done) {
      res.send(data, 200, headers)
      assert(res.setHeader.calledWith('somekey', 'someval'))
      done()
    })

    it('should set statusCode unless already set', function(done) {
      delete res.statusCode
      res.send(data, 404)
      assert.equal(res.statusCode, 404)
      res.send(data, 500)
      assert.equal(res.statusCode, 404)
      done()
    })

    it('should call end with buffer', function(done) {
      res.end = sinon.spy() // reset the spy
      res.send(data)
      assert(res.end.calledOnce)
      assert(res.end.args[0][0].constructor === Buffer)
      done()
    })

  })

  describe('html', function() {
    var req = tf.getBareRequest()
    var res = tf.getBareResponse()
    var data = '<div>Teamcenter!!</div>'
    var headers = { 'somekey':'someval' }

    response(req, res, config)
    res.send = sinon.spy()

    it('should add html helper', function(done) {
      assert(res.html)
      done()
    })

    it('should set content-type header', function(done) {
      res.html(data)
      assert(res.send.called)
      assert.equal(res.send.args[0][2]['content-type'], 'text/html')
      done()
    })

  })

  describe('json', function() {
    var req = tf.getBareRequest()
    var res = tf.getBareResponse()
    var data = { text: 'Teamcenter!!' }
    var headers = { 'somekey':'someval' }

    response(req, res, config)
    res.send = sinon.spy()

    it('should add json helper', function(done) {
      assert(res.json)
      done()
    })

    it('should set content-type header', function(done) {
      res.json(data)
      assert(res.send.called)
      assert.equal(res.send.args[0][2]['content-type'], 'application/json')
      done()
    })

    it('should call send with stringified data', function(done) {
      res.json(data)
      assert(res.send.calledWith(JSON.stringify(data)))
      done()
    })

  })

  describe('redirect', function() {
    var req = tf.getBareRequest()
    var res = tf.getBareResponse()
    var target = 'http://www.ngin.com'

    response(req, res, config)

    res.html = sinon.spy()
    res.json = sinon.spy()
    res.send = sinon.spy()

    it('should add redirect helper', function(done) {
      assert(res.redirect)
      done()
    })

    it('should set the location header', function(done) {
      res.redirect(target)
      assert(res.setHeader.calledWith('location', target))
      done()
    })

    it('should set statusCode correctly', function(done) {
      res.redirect(target)
      assert.equal(res.statusCode, 302)
      res.redirect(target, 12345)
      assert.equal(res.statusCode, 12345)
      done()
    })

    it('should call html helper', function(done) {
      res.html = sinon.spy() // reset the spy
      res.json = sinon.spy() // reset the spy
      res.redirect(target)
      assert(res.html.calledOnce)
      assert(!res.json.called)
      done()
    })

    it('should call json helper', function(done) {
      res.html = sinon.spy() // reset the spy
      res.json = sinon.spy() // reset the spy
      req.contentNegotiator.preferredMediaType.returns('application/json')
      res.redirect(target)
      assert(res.json.calledOnce)
      assert(!res.html.called)
      done()
    })

  })



})