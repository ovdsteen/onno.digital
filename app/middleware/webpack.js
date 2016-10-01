const webpack = require('webpack');
const webpackConfig = require('../../webpack.config');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');

const compiler = webpack(webpackConfig);

const webpackMiddleware = [
  webpackDevMiddleware(compiler, {
     publicPath: webpackConfig.output.publicPath,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
    historyApiFallback: true
  }),
  webpackHotMiddleware(compiler, {
    log: console.log
  })
]


module.exports = webpackMiddleware;
