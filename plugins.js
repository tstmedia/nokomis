
var extendable = require('extendable')
var _ = require('underscore')


var extendedInstanceMembers = {
  initializePlugins: function() {
    this._plugins = {}
  }
}

var extendedClassMembers = {
  addPlugin: function(PluginClass) {
    this._plugins.push(PluginClass)
  }
}



var Plugin = function(options) {

}

// Instance members

_.extend(Plugin.prototype, {

})

// Class Members

_.extend(Plugin, {

  makePluggable: function(Class) {
    _.extend(Class, extendedClassMembers)
    _.extend(Class.prototype, extendedInstanceMembers)
    Class._plugins = {}
  }

})


module.exports = Plugin
