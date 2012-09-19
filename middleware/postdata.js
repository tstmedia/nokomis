// Handles data sent via POST or PUT

module.exports = postdata

var qs = require('querystring')
var StringDecoder = require('string_decoder').StringDecoder

/**
 * Attaches a data object to the request
 * with json and form methods
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} config
 */

function postdata(req, res, config) {

  var body = ''
  var data = new StringDecoder
  req.on('data', function(c) {
    body += data.write(c)
  })
  req.on('end', function() {
    req.body = body
    req.emit('body', body)
  })

  req.data = {
    json: function(callback) {
      if (!req.headers['content-type'].match(/\/(x-)?json$/)) {
        callback({statusCode:415})
      }
      if (req.body)
        return processJSON(req.body, callback)
      req.on('body', function(body) {
        processJSON(body, callback)
      })
    },
    form: function(callback) {
      if (req.headers['content-type'] !== 'application/x-www-form-urlencoded') {
        return res.error(415)
      }
      if (req.body) return processForm(req.body, callback)
      req.on('body', function(body) {
        processForm(body, callback)
      })
    },
    body: function(callback) {
      if (req.body) return callback(req.body)
      req.on('body', function(body) {
        callback(null, body)
      })
    }
  }
}

/**
 * Attempt to process the body data into JSON
 *
 * @param {String} body
 * @param {Function} callback
 */

function processJSON(body, callback) {
  var json
  try {
    json = JSON.parse(body)
  } catch (err) {
    err.statusCode = 400
    return callback(err)
  }
  return callback(null, json)
}

/**
 * Attempt to process the body
 * data into an object hash
 *
 * @param {String} body
 * @param {Function} callback
 */

function processForm(body, callback) {
  callback(null, qs.parse(body))
}
