
var assert = require('assert')
var sinon = require('sinon')
var tf = require('../fixtures')
var router
var controller

describe('Router', function() {

  beforeEach(function(done) {
    // the router needs to be un-cached for these tests to work properly.
    // console.log(Object.keys(require.cache))
    delete require.cache[require.resolve('../../app/router')]
    delete require.cache[require.resolve('routes')]
    delete require.cache[require.resolve('../fixtures/controller')]

    router = require('../../app/router')
    controller = require('../fixtures/controller')
    done()
  })

  describe('Register', function() {

    it('should have register method', function(done) {
      assert(router.register)
      done()
    })

    it('should correctly register a route', function(done) {
      var route = '/route/:id'
      var controller = '../../test/fixtures/controller'
      router.register(route, controller)
      assert.equal(router.routes[route], controller)
      done()
    })

    it('should correctly register a route with object syntax', function(done) {
      var controller = '../../test/fixtures/controller'
      router.register({ '/my/:route': controller })
      assert.equal(router.routes['/my/:route'], controller)
      done()
    })
  })

  describe('Match', function(){

    it('should have a match method', function(done) {
      assert(router.match)
      done()
    })

    // it('should return match object when the url does not match a route', function(done) {
    //   var match = router.match('dont match anything')
    //   assert.equal(typeof match, 'object')
    //   assert(!match.controller)
    //   assert(!match.action)
    //   done()
    // })

    it('should return undefined when the url does not match a route', function(done) {
      var match = router.match('dont match anything')
      assert.equal(typeof match, 'undefined')
      done()
    })

    it('should match when the url correctly matches a route', function(done) {
      router.register('/my/:id', '../../test/fixtures/controller')
      var match = router.match('/my/value')
      assert.equal(typeof match, 'object')
      assert.equal(match.controller, controller)
      assert(!match.action)
      done()
    })

    it('should match with an action', function(done) {
      router.register('/your/:id', '../../test/fixtures/controller::action')
      var match = router.match('/your/value')
      assert.equal(typeof match, 'object')
      assert.equal(match.controller, controller)
      assert.equal(match.action, 'action')
      done()
    })

  })

})