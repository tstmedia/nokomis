

module.exports = response


var ErrorPage = require('error-page')


function response(req, res, config) {

  /**
   * Provides a redirect helper on the res object
   *
   * @param {String} target
   * @param {Number} code
   * @api public
   */

  res.redirect = function (target, code) {
    res.statusCode = code || 302
    res.setHeader('location', target)
    var avail = ['text/html', 'application/json']
    var mt = req.contentNegotiator.preferredMediaType(avail)
    if (mt === 'application/json') {
      res.json({ redirect: target, statusCode: code })
    } else {
      res.html( '<html><body><h1>Moved'
              + (code === 302 ? ' Permanently' : '') + '</h1>'
              + '<a href="' + target + '">' + target + '</a>')
    }
  }

  /**
   * Provides a send helper
   *
   * @param {String} data
   * @param {Number} status
   * @param {Object} headers
   * @api public
   */

  res.send = function (data, status, headers) {
    res.statusCode = res.statusCode || status
    if (headers) Object.keys(headers).forEach(function (h) {
      res.setHeader(h, headers[h])
    })
    if (!Buffer.isBuffer(data)) data = new Buffer(data)
    res.setHeader('content-length', data.length)
    res.end(data)
  }

  /**
   * JSON helper for returning a json object
   * in the response
   *
   * @param {Object} obj
   * @param {Number} status
   * @api public
   */

  res.json = res.sendJSON = function (obj, status) {
    res.send(JSON.stringify(obj), status, {'content-type':'application/json'})
  }

  /**
   * HTML helper for returning an html string
   * in the response
   *
   * @param {String} data
   * @param {Number} status
   * @api public
   */

  res.html = res.sendHTML = function (data, status) {
    res.send(data, status, {'content-type':'text/html'})
  }

}