const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'none',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, '_bundles'),
    filename: 'annotpdf.min.js',
    libraryTarget: 'umd',
    library: 'pdfAnnotate',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization : {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  }
};
