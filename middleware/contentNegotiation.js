
module.exports = contentNegotiation

var Negotiator = require('negotiator')

function contentNegotiation(req, res) {
  req.contentNegotiator = req.contentNegotiator = new Negotiator(req)
}
