
module.exports = templating

var path = require('path')
//var templates = require('../templates/templates')
var _ = require('underscore')
var async = require('async')


var templatesRoot = ''

/**
 * Decorate response object with
 * templating methods
 *
 * @param {Object} req
 * @param {Object} res
 * @api public
 */

function templating(req, res, config) {

  if (!templatesRoot) templatesRoot = path.resolve(config.appRoot, 'templates')

  res.render = function(tmplPath, data, options) {
    if (!tmplPath) throw 'No template specified'
    options || (options = {})

    data || (data = {})
    renderTemplate(tmplPath, data, function(err, result) {
      if (options.layout === false)
        return res.html(result)

      data = _.extend({}, data, { body: result })
      var layouts = recurseLayout(tmplPath)

      if (layouts.length) {
        async.reduce(layouts, '', function(memo, item, callback) {
          if (memo) data = { body: memo }
          renderTemplate(item, data, callback)
        }, function(err, result) {
          if (err) return res.error(err)
          res.html(result)
        })
      }

    })
  }.bind(res)

}


/**
 * Render the template
 *
 * @param {String} tmplPath
 * @param {Object} data
 * @param {Function} cb
 * @api private
 */

function renderTemplate(tmplPath, data, cb) {
  var template

  if (typeof tmplPath == 'function')
    template = tmplPath
  else
    template = templates[tmplPath]

  var result
  if (template) {
    try {
      result = template(data)
    } catch (err) {
      return cb(err)
    }
    return cb(null, result)
  }
  return cb('Template not found ' + tmplPath)
}


/**
 * Recurses over the template path looking for layout
 * templates in every directory up to the template root.
 *
 * @param {String} tmplPath
 * @returns {Array}
 * @api private
 */

function recurseLayout(tmplPath) {
  var layouts = []
  var layoutPath
  var splats
  var i = 0
  while (tmplPath) {
    if (i > 5) break
    splats = tmplPath.split('/')
    splats = splats.slice(0, splats.length-1)
    tmplPath = splats.join('/')
    layoutPath = tmplPath + (tmplPath.length ? '/' : '') + 'layout'
    if (layoutPath in templates) {
      layouts.push(layoutPath)
    }
  }
  return layouts
}
