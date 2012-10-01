
var fs = require('fs')
var path = require('path')
var glob = require('glob')
var async = require('async')
var _ = require('underscore')
var extendable = require('extendable')

// Provide a basic compliant templating engine
var engine = {
  // The most basic of compile functions
  compile: function(str) {
    // Just provide a function that returns the template string
    return function() { return str }
  }
}



function Templating() {
  this.cache = _.extend({}, this.cache)
}

_.extend(Templating.prototype, {

  engine: engine,
  templatePath: '../../app/templates',
  cache: {},

  render: function(tmpl, data, options, callback) {
    var self = this
    this.loadTemplate(tmpl, options, function(err, template) {
      if (err) return callback(err)

      self.renderTemplate(template, data, function(err, result) {
        if (err) return callback(err)
        if (options.layout === false)
          return callback(err, result)

        var layout = typeof options.layout === 'string' ? options.layout : 'layout'
        options = _.extend({}, options, {layout:false})
        data = _.extend({}, data, {__body:result})
        self.render(layout, data, options, function(err, result) {
          callback(err, result)
        })
      })
    })
  },

  renderTemplate: function(template, data, callback) {
      var result, error
      try {
        result = template(data, options)
      } catch(e) {
        error = e
      }
      callback(error, result)
  },

  loadTemplate: function(tmpl, options, callback) {
    var self = this

    // normalize tmpl with the specified extension
    if (this.extension && !~tmpl.indexOf('.'+this.extension))
      tmpl + '.' + this.extension

    if (cache[tmpl]) return callback(null, cache[tmpl])

    if (typeof options == 'function') {
      callback = options
      options = null
    }

    var filePath = path.resolve(this.templatePath, tmpl)
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) {
        console.error('Error loading template [Templating::loadTemplate]')
        console.error(err)
        callback(err)
      }

      cache[tmpl] = self.engine.compile(data, options)
      callback(null, cache[tmpl])
    })
  },

  preload: function(match, callback) {
    var self = this
    match = match || '**/*'
    glob(match, {cwd:this.templatePath}, function(err, files) {
      async.forEach(files, function(file, callback) {
        self.loadTemplate(file, callback)
      }, function(err) {
        if (err) console.error('Error preloading templates')
        if (typeof callback == 'function') callback(err)
      })
    })
  }

})

Templating.extend = extendable

module.exports = Templating
