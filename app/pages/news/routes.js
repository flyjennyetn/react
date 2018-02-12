export default {
  component: require('./index').default,
  childRoutes: [
    {
      path: '/news/list',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./list/').default))
      }
    },
    {
      path: '/news/details/:id',
      getComponent(state, cb){
        require.ensure([], require => cb(null, require('./details/').default))
      }
    }
  ]
}