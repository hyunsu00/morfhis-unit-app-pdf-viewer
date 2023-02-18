const path = require('path');

module.exports = {
  mode: 'development',
  devtool: "inline-source-map",
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, '_bundles'),
    filename: 'annotpdf.js',
    libraryTarget: 'umd',
    library: 'PDFAnnotateWriter',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    fallback: {
      fs: false,
    },
    extensions: [".tsx", ".ts", ".js"],
  },
};
