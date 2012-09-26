
module.exports = contentNegotiation

var Negotiator = require('negotiator')

function contentNegotiation(req, res) {
  req.contentNegotiator = res.contentNegotiator = new Negotiator(req)
}
