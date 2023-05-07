const { DefinePlugin } = require('webpack');

const libsFiles = (() => {
  function getFiles(dir, files_) {
    files_ = files_ || [];
    var files = require('fs').readdirSync(dir);
    for (var i in files) {
      var name = dir + '/' + files[i];
      if (require('fs').statSync(name).isDirectory()) {
        getFiles(name, files_);
      } else {
        files_.push(name.replace('./public', ''));
      }
    }
    return files_;
  }

  return getFiles('./public/libs');
})();

module.exports = {
  webpack: function (config, env) {
    config.module.rules.push({
      test: /\.html$/i,
      loader: 'html-loader',
    });
    config.plugins.push(
      new DefinePlugin({
        'process.env.LIBS_FILES': JSON.stringify(libsFiles)
      })
    );
    return config;
  },
};
