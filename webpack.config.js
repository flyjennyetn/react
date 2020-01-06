const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const isDebug = process.env.NODE_ENV === 'development';

var webpackConfig = {
  entry: {
    bundle: [
      path.join(__dirname, 'src/index.js')
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'axios',
      'moment',
      'lodash'
    ],
  },
  mode: isDebug ? 'development' : 'production',
  output: {
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  externals: {
    'axios': 'axios',
    'moment': 'moment',
    'lodash': 'lodash',
  },
  resolve: {
    extensions: ['.js', '.scss', '.json'],
    modules: ['node_modules'],
    alias: {
      components: path.resolve(__dirname, './src/components'),
      actions: path.resolve(__dirname, './src/actions'),
      reducers: path.resolve(__dirname, './src/reducers'),
      sagas: path.resolve(__dirname, './src/sagas'),
      service: path.resolve(__dirname, './src/service'),
      assets: path.resolve(__dirname, './assets'),
      utils: path.resolve(__dirname, './src/utils'),
    },
  },
  performance: {
    hints: false
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: ['babel-loader'],
      loader: ['babel-loader', 'eslint-loader'],
      exclude: [
        path.resolve(__dirname, 'node_modules'),
      ]
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    }, {
      test: /\.scss$/,
      use: [
        isDebug ? 'style-loader' : MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            minimize: true
          }
        },
        "postcss-loader"
      ],
      include: path.resolve(__dirname, 'assets/scss')
    }, {
      test: /\.scss$/,
      use: [
        isDebug ? 'style-loader' : MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            modules: true,
            sourceMap: true,
            importLoaders: 1,
            localIdentName: '[name]_[local]_[hash:base64:3]',
            minimize: true
          }
        },
        "postcss-loader"
      ],
      include: path.resolve(__dirname, 'src')
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/[name]-[hash:6].[ext]'
        }
      }]
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'assets/[name]-[hash:6].[ext]'
        }
      }],
    }, {
      test: /\.(csv|tsv)$/,
      use: [
        'csv-loader',
      ],
    }, {
      test: /\.xml$/,
      use: [
        'xml-loader',
      ],
    }, ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),

    new HtmlWebpackPlugin({
      title: '爱奇艺-在线视频网站-海量正版高清视频在线观看',
      template: path.resolve(__dirname, 'src/template.html'),
      filename: 'index.html',
      inject: 'body',
      hash: true,
      cache: true,
      minify: {
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
    }), 　
    new InlineManifestWebpackPlugin(), 　

  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [],
    splitChunks: {
      chunks: 'async', //需要优化的模块  all, async, and initial.
      minSize: 30000, //生成块的最小大小(以字节为单位)。
      maxSize: 0,
      minChunks: 1, //在分割之前必须共享模块的最小块数。
      maxAsyncRequests: 5, //按需加载时并行请求的最大数量。
      maxInitialRequests: 3, //在入口点的最大并行请求数。
      automaticNameDelimiter: '~',
      name: true, //分割块的名称。提供true将自动生成基于块和缓存组键的名称。提供字符串或函数将允许您使用自定义名称。如果名称与入口点名称匹配，则将删除入口点。
      cacheGroups: { //缓存组可以继承和/或覆盖splitChunks中的任何选项。但是测试、优先级和重用存在块只能在缓存组级别上配置。要禁用任何默认缓存组，请将它们设置为false。
        //priority: 0, //一个模块可以属于多个缓存组。优化将选择优先级更高的缓存组。默认组具有负优先级，允许自定义组具有更高优先级(自定义组的默认值为0)。
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true //如果当前块包含已经从主包中分离出来的模块，它将被重用，而不是生成新的模块。这可能会影响块的最终文件名。
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/, //控制此缓存组选择哪些模块。省略它选择所有模块。它可以匹配绝对模块资源路径或块名。当匹配块名时，将选择块中的所有模块。
          name: 'vendor',
          chunks: 'all',
        },
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
};

if (isDebug) {
  webpackConfig.devtool = 'cheap-module-eval-source-map'
  webpackConfig.entry.bundle = [
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch'
  ].concat(webpackConfig.entry.bundle)
  webpackConfig.plugins.push(new webpack.NamedModulesPlugin())
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())

} else {
    // webpackConfig.output.publicPath = '/ssports-iqiyi-active-h5/dist/'
    webpackConfig.output.publicPath = '/resource/h5-active/'
  webpackConfig.output.filename = 'assets/[name].[hash].bundle.js'
  webpackConfig.output.chunkFilename = 'assets/[name].[hash].bundle.js'
  webpackConfig.externals = Object.assign({}, webpackConfig.externals, {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    'history': 'History'
  })

  webpackConfig.plugins.push(new CleanWebpackPlugin(['dist']))

  webpackConfig.plugins.push(new MiniCssExtractPlugin({
    filename: "assets/[name].[chunkhash:8].css",
    chunkFilename: "assets/[id].css"
  }))

  webpackConfig.plugins.push(new CompressionWebpackPlugin({
    algorithm: "gzip",
    test: new RegExp(
      '\\.(js|css|ttf|svg|eot|woff)$' //压缩 js 与 css
    ),
    threshold: 10240,
    minRatio: 0.8
  }))

  webpackConfig.optimization.minimizer.push(new UglifyJsPlugin({
    cache: true,
    parallel: true,
    sourceMap: true,
    uglifyOptions: {
      warnings: false
    }
  }))
  webpackConfig.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}))
  webpackConfig.optimization.splitChunks.cacheGroups = Object.assign({}, webpackConfig.optimization.splitChunks.cacheGroups, {
    vendor: {
      chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
      test: /connected-react-router/, // 正则规则验证，如果符合就提取 chunk
      name: 'vendor',
      minSize: 0,
      minChunks: 1,
      enforce: true,
      maxAsyncRequests: 1, // 最大异步请求数， 默认1
      maxInitialRequests: 1, // 最大初始化请求书，默认1
      reuseExistingChunk: true, // 可设置是否重用该chunk（查看源码没有发现默认值）
    },
  })

  // webpackConfig.plugins.push(new WorkboxWebpackPlugin.GenerateSW({
  //   clientsClaim: true,
  //   skipWaiting: true,
  //   exclude: [/\.map$/]
  // }))

}
// export default webpackConfig
module.exports = webpackConfig