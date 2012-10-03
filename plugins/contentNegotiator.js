
var Plugin = require('../plugin')
var Negotiator = require('negotiator')

var ContentNegotiator = module.exports = Plugin.extend({

  run: function(instance) {
    instance._neg = new Negotiator(instance.req)
  },

  preferredMediaType: function() {
    return this._neg.preferredMediaType.apply(this._neg, arguments)
  },

  preferredMediaTypes: function() {
    return this._neg.preferredMediaTypes.apply(this._neg, arguments)
  },

  preferredLanguage: function() {
    return this._neg.preferredLanguage.apply(this._neg, arguments)
  },

  preferredLanguages: function() {
    return this._neg.preferredLanguages.apply(this._neg, arguments)
  },

  preferredEncoding: function() {
    return this._neg.preferredEncoding.apply(this._neg, arguments)
  },

  preferredEncodings: function() {
    return this._neg.preferredEncodings.apply(this._neg, arguments)
  }

})