var assert = require('assert')
var sinon = require('sinon')
var MemberList = require('../../../app/controllers/memberList')
var MemberDetail = require('../../../app/controllers/memberDetail')
var tf = require('../../fixtures')


describe('Controllers > members', function() {
  describe('detail', function() {

    it('should fetch a single member from Ngin', function(done) {
      var options = tf.getControllerOptions()
      var mockMember = tf.mockTeam

      new MemberDetail(options)

      assert(options.req.ngin.Member.fetch.calledOnce)
      assert(options.req.ngin.Member.fetch.calledWith(mockMember.id))
      done()
    })

    it('should render a single member', function(done) {
      var options = tf.getControllerOptions()
      var mockMember = tf.mockTeam

      new MemberDetail(options)

      assert(options.res.render.calledOnce)
      assert(options.res.render.calledWith('members/detail', mockMember))
      done()
    })
  })

  describe('list', function() {

    it('should fetch a list of members from Ngin', function(done) {
      var options = tf.getControllerOptions()

      options.res.render = function() {
        assert(options.req.ngin.Member.list.called)
        assert(options.req.ngin.Member.list.calledOnce)
        done()
      }

      new MemberList(options)
    })

  })
})