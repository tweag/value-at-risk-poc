const baseConfig = require('./webpack.config')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  ...baseConfig,
  plugins: [
    new UglifyJsPlugin()
  ],
}
