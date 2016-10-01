var path = require('path');
var webpack = require('webpack');

var includePaths = require('node-neat').includePaths;
includePaths.push([require('node-normalize-scss').includePaths])

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './src'
  ],
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
              'file?hash=sha512&digest=hex&name=[hash].[ext]',
              'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ]
      }
    ]
  },

  sassLoader: {
    includePaths: includePaths
  },

  eslint: {
    emitWarning: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
