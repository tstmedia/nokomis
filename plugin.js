
var extendable = require('extendable')
var _ = require('underscore')

var Plugin = function(Class, args) {
  var methods = _.clone(this)
  _.each(['constructor', 'initialize', 'run'], function(m) { delete methods[m] })
  _.defaults(Class.prototype, methods)
  this.initialize.apply(this, args)
}

// Instance members

_.extend(Plugin.prototype, {

  // Called once for each instace of the plugin.
  // Almost always before the extended Class is initialized
  initialize: function() {},

  // Called once for each instance of the extended Class
  // in the context of that instance
  run: function() {}

})

// Class Members

_.extend(Plugin, {

  extend: extendable,

  makePluggable: function(Class) {
    var plugins = []

    // The instance methods added to
    // a Class that is made 'pluggable'
    _.extend(Class.prototype, {
      runPlugins: function() {
        var args = [this].concat(_.toArray(arguments))
        for (var i = 0; i < plugins.length; i++) {
          plugins[i].run.apply(plugins[i], args)
        }
      }
    })

    // The Class methods added to a
    // Class that is made 'pluggable'
    _.extend(Class, {
      addPlugin: function(PluginClass) {
        plugins.push(new PluginClass(Class, _.rest(arguments)))
      }
    })
  }

})

module.exports = Plugin