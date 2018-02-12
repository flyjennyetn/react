export default {

    path: '/',
    component: require('./App').default,
    indexRoute: {
        getComponent(state, cb){
            require.ensure([], require => cb(null, require('./Login').default))
        }
    },
    childRoutes: [
        require('./news/routes').default,
        {
            path: '/login',
            getComponent(state, cb){
                require.ensure([], require => cb(null, require('./Login').default))
            }
        },
        {
            path: '*',
            getComponent(state, cb){
                require.ensure([], require => cb(null, require('./Error').default))
            }
        }
    ]
}
