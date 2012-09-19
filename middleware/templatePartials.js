/*!
 * Register all templates as partials
 */

module.exports = function(){} // return noop

var Handlebars = require('handlebars')
var templates = require('../templates/templates')

Object.keys(templates).forEach(function(file) {
  Handlebars.registerPartial(file.replace(/\//g,'.'), templates[file])
})
