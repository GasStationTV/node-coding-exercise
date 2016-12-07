const Browserify = require('browserify')

module.exports = function (file, fn){
  if(file.type === 'js'){
  Browserify({ debug: file.debug })
    .add(file.path)
    .transform(require('riotify'))
    .transform(require('babelify'))
    .bundle(fn);
  } else if (file.type === 'css'){

  }
}
