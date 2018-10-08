const path = require('path');
const webpack = require('webpack');

const bourbon = require("bourbon").includePaths;
const neat = require("bourbon-neat").includePaths;

module.exports = {
  mode: 'development',
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './src'
  ],
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          }, 
          {
            loader: "css-loader"
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: bourbon.concat(neat)
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file?hash=sha512&digest=hex&name=[hash].[ext]'
          },
          {
            loader: 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          }
        ]
      }
    ]
  },

  optimization: {
    noEmitOnErrors: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
