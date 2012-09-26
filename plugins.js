
var extendable = require('extendable')
var _ = require('underscore')

var Plugin = function(Class) {
  _.defaults(Class.prototype, this.prototype)
}

// Instance members

_.extend(Plugin.prototype, {

  initialize: function() {}

})

// Class Members

_.extend(Plugin, {

  extend: extendable,

  makePluggable: function(Class) {
    var plugins = []

    // The instance methods added to
    // a Class that is made 'pluggable'
    _.extend(Class.prototype, {
      initializePlugins: function() {
        for (var i = 0; i < plugins.length; i++) {
          plugins[i].initialize.apply(this, arguments)
        }
      }
    })

    // The Class methods added to a
    // Class that is made 'pluggable'
    _.extend(Class, {
      addPlugin: function(PluginClass) {
        plugins.push(new PluginClass(_.rest(arguments)))
      }
    })
  }

})

module.exports = Plugin
