/**
 * Configure the request timeout
 */

var requestTimeout = require('request-timeout')

module.exports = timeout

/**
 * Enable a timeout and subscribe
 * to the `timeout` event
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} config
 * @api public
 */

function timeout(req, res, config) {
  var seconds = config.requestTimeout
  requestTimeout(req, res, seconds)
  req.on('timeout', timeoutHandler)
}

/**
 * Handle the timeout
 *
 * @param {Object} req
 * @param {Object} res
 * @api private
 */

function timeoutHandler(req, res) {
  return res.error(504, 'Server timeout')
}