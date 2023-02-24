const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
require('webpack-dev-server');

require('dotenv').config();

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval', // Recommended choice for development builds with maximum performance.
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    },
    open: true,
    hot: true,
    compress: true,
    port: process.env.HTTP_PORT,
    static: {
      directory: path.join(__dirname, 'dist')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        include: [path.resolve(__dirname, 'src')],
        use: [
          {
            loader: 'style-loader' // 2. Inject styles into DOM
          },
          {
            loader: 'css-loader', // 1. Turns css into commonjs
            options: { modules: { localIdentName: '[name]_[local]_[hash:base64:5]' } }
          }
        ]
      }
    ]
  }
});
