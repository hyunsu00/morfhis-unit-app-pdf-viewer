const { DefinePlugin } = require('webpack');

const addStaticFiles = (() => {
  function getFiles(dir, files_) {
    files_ = files_ || [];
    var files = require('fs').readdirSync(dir);
    for (var i in files) {
      var name = dir + '/' + files[i];
      if (require('fs').statSync(name).isDirectory()) {
        getFiles(name, files_);
      } else {
        files_.push(name);
      }
    }
    return files_;
  }
  const files = getFiles('./public/libs');
  const addStaticFiles = files.map(file => {
    return file.replace('./public', '');
  });

  return addStaticFiles;
})();

module.exports = {
  webpack: function (config, env) {
    config.module.rules.push({
      test: /\.html$/i,
      loader: 'html-loader',
    });
    config.plugins.push(
      new DefinePlugin({
        'process.env.ADD_STATIC_FILES': JSON.stringify(addStaticFiles)
      })
    );
    return config;
  },
};