const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

let fileName = 'pdf-annotate';

module.exports = {
  devtool: 'none',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  },
  entry: './index.js',
  mode: 'production',
  output: {
    filename: fileName + '.min.js',
    path: path.join(__dirname, 'dist'),
    library: 'PDFAnnotate',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['add-module-exports']
        }
      }
    ]
  }
};
