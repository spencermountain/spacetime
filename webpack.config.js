//var path = require('path')
var MinifyPlugin = require('babel-minify-webpack-plugin')
var minifyOpts = {}
var pluginOpts = {}
var min = new MinifyPlugin(minifyOpts, pluginOpts)

let Spacetime = {
  plugins: [min],
  entry: {
    spacetime: './src/index.js',
  },
  output: {
    filename: 'spacetime.js',
    path: __dirname,
    library: 'spacetime',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  /*
  module: {
    loaders: [{
      test: /.js$/,
      loaders: 'buble-loader',
      include: path.join(__dirname, 'src'),
    }]
  },*/
}

module.exports = [Spacetime]

