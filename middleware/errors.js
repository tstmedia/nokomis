
module.exports = errors

var _ = require('underscore')
var Domain = require('domain')
var ErrorPage = require('error-page')

/**
 * Decorate request and response objects with
 * unexpected error handlers
 *
 * @param {Object} req
 * @param {Object} res
 * @api public
 */

function errors(req, res, config) {

  // setup error-page module
  var defaultErrorPageConfig = {
    404: handle404,
    500: handle500,
    '*': handleError,
    debug: false
  }
  var errorPageConfig = _.extend(defaultErrorPageConfig, config.errorPage)
  res.error = new ErrorPage(req, res, errorPageConfig)


  // Use a node Domain to handle all
  // unexpected errors in one location

  var domain = Domain.create()
  domain.add(req)
  domain.add(res)

  domain.on('error', function(err) {
    try {
      if (res.error) {
        res.error(err)
      } else {
        res.statusCode = 500
        res.setHeader('content-type', 'text/plain')
        res.end('Server Error\n' + err.message)
      }

      // don't destroy the domain before sending the error
      res.on('close', function() {
        domain.dispose()
      })

      // but don't wait forever
      setTimeout(function() {
        domain.dispose()
      }, 1000)

      // close down the server so a fresh worker can be started
      req.client.server.close()

    } catch (err) {
      domain.dispose()
    }
  })


}

/**
 * Handle 404 error
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} data
 * @api private
 */

function handle404(req, res, data) {
  return handleError(req, res, data, 'errors/404')
}

/**
 * Handle 500 error
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} data
 * @api private
 */

function handle500(req, res, data) {
  return handleError(req, res, data, 'errors/500')
}

/**
 * Handle all response errors
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} data
 * @param {String} template
 * @api private
 */

function handleError(req, res, data, template) {
  console.log(data)

  template = template || 'errors/default'
  var availableMediaTypes = ['text/html', 'application/json']
  var preferred = req.neg.preferredMediaType(availableMediaTypes)
  if (preferred == 'text/html')
    return res.render(template, data)

  var err = { error: _.extend({}, data) }
  delete err.error.options
  delete err.error.stack
  delete err.error.error
  res.json(err)
}
