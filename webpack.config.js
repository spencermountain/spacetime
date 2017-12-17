var MinifyPlugin = require('babel-minify-webpack-plugin')
var minifyOpts = {}
var pluginOpts = {}
var min = new MinifyPlugin(minifyOpts, pluginOpts)

let ImmutableSpacetime = {
  plugins: [min],
  entry: {
    spacetime: './src/immutable.js'
  },
  output: {
    filename: 'immutable.js',
    path: __dirname,
    library: 'spacetime',
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
  },
}

let Spacetime = {
  plugins: [min],
  entry: {
    spacetime: './src/index.js'
  },
  output: {
    filename: 'spacetime.js',
    path: __dirname,
    library: 'spacetime',
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
  },
}

module.exports = [ImmutableSpacetime, Spacetime]
