/*!
 * Register helpers
 */

module.exports = function(){} // return noop

var path = require('path')
var glob = require('glob')

glob.sync('app/templates/helpers/**/*.js').forEach(function(s) {
  s = path.join(__dirname, '../..', s)
  require(s)
})
