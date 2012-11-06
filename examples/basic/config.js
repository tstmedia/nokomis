var conf = module.exports = {}
var env = conf.NODE_ENV = process.env.NODE_ENV || 'development'

conf.config = __filename

conf.appRoot = __dirname + '/app'

conf.server = {
  port: process.env.PORT || 3082,
  host: 'localhost',
  cluster: { size: require('os').cpus().length }
}
