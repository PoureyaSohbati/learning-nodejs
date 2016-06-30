/* eslint-disable */

module.exports = {
  'entry': ['./src/todo.js'],
  'output': {
    'publicPath': '/',
    'filename': 'build/bundle.js'
  },
  'devtool': 'source-map',
  'debug': true,
  'module': {
    'loaders': [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-decorators-legacy']
        }
      }
    ]
  }
}
