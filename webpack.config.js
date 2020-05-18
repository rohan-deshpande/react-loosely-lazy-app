const path = require('path');
const { ReactLooselyLazyPlugin } = require('react-loosely-lazy/webpack-plugin');
const babelPlugins = [
  ['@babel/plugin-proposal-class-properties'],
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-syntax-import-meta',
  [
    'react-loosely-lazy/babel-plugin',
    {
      client: true
    }
  ]
];
const babelPresets = [
  ['@babel/preset-env', { modules: false }],
  '@babel/preset-react'
];
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
  mode: 'development',
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
            presets: babelPresets,
            plugins: babelPlugins
          }
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          plugins: babelPlugins,
          presets: [...babelPresets, '@babel/preset-typescript']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      'react-loosely-lazy-app': path.resolve(__dirname, './src')
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
