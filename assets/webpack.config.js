const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'poc.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  plugins: [
    new UglifyJsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  },
    devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  }
}
