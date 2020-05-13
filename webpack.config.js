const path = require('path');
const { ReactLooselyLazyPlugin } = require('react-loosely-lazy/webpack-plugin');

module.exports = {
  entry: {
    main: path.join(__dirname, 'src/index.js')
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/build/'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['@babel/preset-env', { modules: false }],
              '@babel/preset-react'
            ]
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      test: path.resolve(__dirname, 'webpack')
    }
  },
  plugins: [
    new ReactLooselyLazyPlugin({
      filename: 'rll-manifest.json'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'demo'),
    publicPath: '/build/'
  }
};
