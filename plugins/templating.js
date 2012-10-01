var Plugin = require('../plugin')
var _ = require('underscore')
var path = require('path')
var extendable = require('extendable')

module.exports = Plugin.extend({

  initialize: function(config) {
    var tmpl = this.tmpl = new Templating()
    tmpl.templatePath = config.templatePath || tmpl.templatePath
  },

  run: function(instance) {
    instance.tmpl = this.tmpl
  },

  render: function(tmplPath, data, options) {
    this.tmpl.render(tmplPath, data, options)
  }

})
