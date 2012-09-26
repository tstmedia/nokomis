var _ = require('underscore')

function noop(){}

var modules = {}
var defaults = [
  'logging',
  'errors',
  'timeout',
  'postdata',
  'cookies',
  'session',
  'contentNegotiation',
  'response'
]

module.exports = {

  add: function(name, handler) {
    if (typeof name == 'object')
      _.extend(modules, name)
    else
      modules[name] = handler
  },

  remove: function(name) {
    modules[name] = noop
  },

  load: function(req, res, config) {
    // execute the defaults first
    defaults.forEach(function(name) {
      if (typeof modules[name] == 'function')
        modules[name](req, res, config)
      else
        require('./middleware/' + name)(req, res, config)
    })

    // execute the rest
    var keys = _.difference(Object.keys(modules), defaults)
    keys.forEach(function(name) {
      if (typeof modules[name] == 'function')
        modules[name](req, res, config)
    })
  }

}
