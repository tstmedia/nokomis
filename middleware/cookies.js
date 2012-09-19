
module.exports = cookies

var Cookies = require('cookies')

function cookies(req, res, config) {
  req.cookies = req.cookies = new Cookies(req, res, config.keys)
}