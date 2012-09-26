

module.exports = logging

var crypto = require('crypto')
var bunyan = require('bunyan')
var logger

function logging(req, res, config) {

  // create the logger
  if (!logger) {
    logger = bunyan.createLogger(config.log || { name:'Nokomis App' })
  }

  // setup loggers on the req and res objects
  req.log = res.log = logger.child({
    serializers: bunyan.stdSerializers,
    req_id: crypto.randomBytes(4).toString('hex'),
    session: req.sessionToken
  })

  // log information about the request and
  // the client making it
  var remoteAddr = req.socket.remoteAddress + ':' + req.socket.remotePort
  var address = req.socket.address()
  address = address.address + ':' + address.port
  req.log.info({
    req: req,
    remote: remoteAddr,
    address: address
  })

  // log the response when the request has finished
  req.on('finish', function() {
    req.log.info({ res: res })
  })
}