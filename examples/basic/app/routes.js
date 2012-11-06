module.exports = function(router) {

  // tell the router where to find your controllers
  router.setControllerPath(__dirname + '/controllers')

  // register your routes
  router.register({

    // routes with an action
    '/' : { controller: 'home', action: 'index' },
    '/leagues' : { controller: 'leagues', action: 'index' },

    // routes without an action (the initialize function serves as the action)
    '/team' : { controller: 'team' },

    // route based on HTTP method
    '/tournaments'     : { controller: 'tournaments', GET: 'index', POST: 'create' },
    '/tournaments/:id' : { controller: 'tournaments', GET: 'show', PUT: 'update', DELETE: 'destroy' },

    // static routes go last
    '/*?' : { controller: 'static' }

  })

}
