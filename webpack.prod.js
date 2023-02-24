const path = require('path');
const { merge } = require('webpack-merge');

// Webpack plugins imports
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Used it if you want to analyze your bundle and optimize it
// If you used this line, uncomment the line in plugins AND install webpack-bundle-analyzer
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      // Minimize js files
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false
          }
        },
        parallel: true,
        extractComments: false
      }),
      // Minimize css files
      new CssMinimizerPlugin()
    ],
    moduleIds: 'deterministic',
    runtimeChunk: {
      name: (entrypoint) => `runtimechunk~${entrypoint.name}`
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all'
        }
      }
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
            loader: MiniCssExtractPlugin.loader // 2. Extract css into separates  files
          },
          {
            loader: 'css-loader', // 1. Turns css into commonjs
            options: { modules: { localIdentName: '[name]_[local]_[hash:base64:5]' } }
          }
        ]
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css'
    })
  ]
});
