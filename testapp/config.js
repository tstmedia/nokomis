
var conf = module.exports = {}

conf.config = __filename

conf.server = {
  port: 8888,
  host: 'localhost',
  cluster: { size: 1 /*require('os').cpus().length*/ }
}
