/**
 * Created by flyjennyetn on 2016-10-26.
 */
import packageInfo from './package.json'
import webpack from 'webpack'
import path from 'path'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import ImageminPlugin from 'imagemin-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CompressionWebpackPlugin from 'compression-webpack-plugin'

const svgDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
    // path.resolve(__dirname, 'assets/fonts'),  // 2. 自己私人的 svg 存放目录
]
var webpackConfig={
    entry: {
        vendor:[
            'babel-polyfill','react-fastclick'
        ],
        bundle:[
            path.join(__dirname, 'client/entry.js')
        ],
    },
    output: {
        path: path.join(__dirname,'dist'),
        filename: 'bundle.min.js',
        publicPath: '/',
    },
    externals: {
        'wx': 'wx',
        'axios': 'axios',
        'moment':'moment',
        'lodash':'lodash',
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.web.js', '.js', '.json']
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename:'vendor.min.js',
            minChunks:Infinity,
        }),
        new HtmlWebpackPlugin({
            title:packageInfo.description,
            template: path.resolve(__dirname,'app/template.html'),
            filename:'index.html',
            inject: 'body',
            hash: true,
            cache:true,
            minify:{
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        })
    ],
    module: {
        rules:[]
    }
}

if(process.env.NODE_ENV){
    webpackConfig.externals=Object.assign({},webpackConfig.externals,{
        'react':'React',
        'react-dom':'ReactDOM',
        'react-router':'ReactRouter',
        'redux':'Redux',
        'react-redux':'ReactRedux',
        'react-router-redux':'ReactRouterRedux',
        'redux-saga':'ReduxSaga'
    })
    webpackConfig.output.chunkFilename='[id].[chunkhash:5].min.js'

    //指定发布地址路径
    webpackConfig.output.publicPath=packageInfo.publicPath[process.env.NODE_ENV]

    webpackConfig.plugins.push(new webpack.HashedModuleIdsPlugin()) //缓存问题
    webpackConfig.plugins.push(new ImageminPlugin({
      pngquant: {
        quality: '95-100'
      }
    }))

    webpackConfig.plugins.push(new ExtractTextPlugin({
        filename:'bundle.min.css',
        disable: false,
        allChunks: true
    }))
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {
            comments: false
        }
    }))
    webpackConfig.plugins.push(new CompressionWebpackPlugin({ //gzip 压缩
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
            '\\.(js|css|ttf|svg|eot|woff)$'    //压缩 js 与 css
        ),
        threshold: 10240,
        minRatio: 0.8
    }))
    webpackConfig.module.rules=[
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },{
            test: /\.css$/,
            use:ExtractTextPlugin.extract({
                fallback:'style-loader',
                use: [
                    {
                        loader:'css-loader',
                        options:{
                            minimize:true
                        }
                    },
                    'postcss-loader'
                ]
            })
        },{
            test: /\.scss$/,
            use:ExtractTextPlugin.extract({
                fallback:'style-loader',
                use: [
                    {
                        loader:'css-loader',
                        options:{
                            minimize:true
                        }
                    },
                    'postcss-loader'
                ]
            }),
            include: path.resolve(__dirname,'assets/scss')
        },{
            test: /\.scss$/,
            use:ExtractTextPlugin.extract({
                fallback:'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[name]_[local]_[hash:base64:3]',
                            minimize:true
                        }
                    },
                    'postcss-loader'
                ]
            }),
            include: path.resolve(__dirname,'app')
        },{
            test:/\.(eot|svg|ttf|woff).*$/,
            loader:'url-loader',
            exclude:svgDirs,
            options:{
                limit:10000
            }
        },{
            test:/\.(gif|jpe?g|png|ico).*$/,
            loader:'url-loader',
            options:{
                limit:10000
            }
        },{
            test:/\.(svg)$/i,
            loader: 'svg-sprite-loader',
            include: svgDirs
        }
    ]
   
}else{

    webpackConfig.devtool='cheap-module-eval-source-map'
    webpackConfig.entry.bundle=[
        'webpack-dev-server/client',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch'
    ].concat(webpackConfig.entry.bundle)
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
    webpackConfig.module.rules=[
        {
            test:/\.js$/,
            loader:'babel-loader',
            exclude: /node_modules/
        },{
            test:/\.css$/,
            use:['style-loader','css-loader','postcss-loader']
        },{
            test:/\.scss$/,
            use:[
                'style-loader',
                'css-loader',
                'postcss-loader'
            ],
            include: path.resolve(__dirname, 'assets/scss')
        },{
            test:/\.scss$/,
            use:[
                'style-loader',
                {
                    loader:'css-loader',
                    options:{
                        modules:true,
                        sourceMap:true,
                        importLoaders:1,
                        localIdentName:'[name]__[local]___[hash:base64:5]'
                    }
                },
                'postcss-loader'
            ],
            include:path.resolve(__dirname, 'app')
        },{
            test:/\.(eot|svg|ttf|woff|pdf).*$/,
            loader:'url-loader',
            exclude:svgDirs,
            options:{
                limit:10000
            }
        },{
            test:/\.(gif|jpe?g|png|ico).*$/,
            loader:'url-loader',
            options:{
                limit:10000
            }
        },{
            test:/\.(svg)$/i,
            loader: 'svg-sprite-loader',
            include: svgDirs
        }
    ]    
}
export default webpackConfig