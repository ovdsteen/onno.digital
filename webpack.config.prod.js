const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const bourbon = require("bourbon").includePaths;
const neat = require("bourbon-neat").includePaths;

module.exports = {
  mode: 'production',
  entry: [
    './src'
  ],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
    publicPath: '/public'
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
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

  optimization:{
    minimize: true
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.DefinePlugin({
    "process.env": {
       NODE_ENV: JSON.stringify("production")
     }
  })
  ]
};
