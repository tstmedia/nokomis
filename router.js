
/**
 * router.js
 *
 * Defers to a controller based on the given route.
 */

// var mapleTree = require('mapleTree')
// var router = new mapleTree.RouteTree()
var router = new (require('routes').Router)()
var _ = require('underscore')
var routes = exports.routes = {}
var controllerPath = '../controllers/'

/**
 * Registers a series of routes and their
 * corresponding controllers on the router
 *
 * @param {object} routes
 * @api public
 */

exports.register = function(rte, ctlr) {
  var rts = {}

  // handle both `rte, ctlr` and `{rte: ctlr}` style arguments
  if (typeof rte == 'object') {
    rts = rte
  } else {
    rts[rte] = ctlr
  }

  _.extend(routes, rts)

  Object.keys(rts).forEach(function(route) {
    // define each route and provide a custom handler for it
    // router.define(route, function() {
    router.addRoute(route, function() {
      // fetch the controller and determine
      // whether or not to use an action
      var handler = rts[route]
      var controller = require(controllerPath + handler.controller)
      this.route = route
      this.controller = controller
      if (handler.action) this.action = handler.action
      // remove `fn` which is this function
      delete this.fn
      return this
    })
  })
}

/**
 * Match a route from a url
 *
 * @param {string} path
 * @returns {object}
 *    cbs {array}           collection of callbacks
 *    controller {function} best matching controller
 *    action {string}       best matching controller action
 *    perfect {boolean}     perfect route match
 *    extras {array}        regexp capture groups not part of params
 *    params {object}       collection of colon args
 *    next {function}       invokes the next matching funcion if one exists
 * @api public
 */

exports.match = function(path) {
  var match = router.match(path)
  return match && match.fn && match.fn() || match
}

/**
 * Sets the file path of the app's controllers
 *
 * @param {string} path
 * @api public
 */

exports.setControllerPath = function(path) {
  path = path || '.'
  if (path.substring(path.length-1) !== '/') path += '/'
  controllerPath = path
}