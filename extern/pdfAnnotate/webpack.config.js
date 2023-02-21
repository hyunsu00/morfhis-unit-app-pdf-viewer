const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env) => {
  let optimization = {};
  if (env && env.mode == 'production') {
    optimization = {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true
            }
          }
        })
      ]
    };
  }
  const mode = (env && env.mode == 'production') ? 'production' : 'development';
  const devtool = (env && env.mode == 'production') ? 'none' : 'inline-source-map';

  return {
    mode: mode,
    devtool: devtool,
    optimization: optimization,
    entry: './src/index.ts',
    output: {
      filename: 'annotpdf.js',
      path: path.resolve(__dirname, '../../public/libs'),
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
  };
};
