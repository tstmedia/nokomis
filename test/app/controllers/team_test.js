var assert = require('assert')
var sinon = require('sinon')
var Team = require('../../../app/controllers/team')
var tf = require('../../fixtures')


describe('Controllers > team', function() {
  describe('root', function() {
    it('should fetch and render a team from Ngin', function(done) {
      var options = tf.getControllerOptions()
      var mockTeam = tf.mockTeam

      new Team(options)

      assert(options.res.render.calledOnce)
      assert(options.res.render.calledWith('team/index', mockTeam))
      assert(options.req.team.calledOnce)
      done()
    })
  })
})