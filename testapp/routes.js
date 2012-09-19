
var path = require('path')

module.exports = function(router) {

  router.setControllerPath(__dirname + '/controllers')

  router.register({
    // static routes
    '/public/*?': { controller: 'static' },
    '/favicon.ico': { controller: 'static' },

    '/': { controller: 'main', action: 'home' },
    '/:id': { controller: 'main' }

  })

}
