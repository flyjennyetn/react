/**
 * Created by flyjennyetn on 2018-11-12
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');

new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true,
    disableHostCheck: true,
    // It suppress error shown in console, so it has to be set to false.
    quiet: false,
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    proxy: {
        '/matchData': {
            target: 'http://www.ssports.com',
            changeOrigin: true
        },
        '/api': {
            target: 'http://www.ssports.com',
            changeOrigin: true
        }
    },
    stats: {
        // Config for minimal console.log mess.
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
    }
}).listen(1111, '0.0.0.0', function(err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at http://localhost:1111');
});