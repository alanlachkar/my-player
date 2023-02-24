const path = require('path');
// Webpack plugins imports
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].bundle.js', // This option determines the name of each output bundle.
    path: path.resolve(__dirname, 'dist'),
    clean: true // Clean the output directory before emit.
  },
  module: {
    rules: [
      {
        exclude: [/node_modules/],
        include: [path.resolve(__dirname, 'src')],
        test: /\.(ts|tsx|js)$/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json']
        },
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        loader: 'url-loader',
        options: {
          name: '[name]_[hash:base64:5].[ext]',
          outputPath: 'assets/images',
          limit: 5000
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        generator: {
          filename: '[name].[ext]',
          outputPath: 'assets/fonts/'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Query React App template',
      favicon: './src/assets/react.svg',
      template: path.resolve('./public/template.html'),
      filename: './index.html' // Removing this line will have the same behavior
    })
  ]
};
