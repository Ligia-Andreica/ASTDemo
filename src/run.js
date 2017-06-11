var fs = require('fs')
var babel = require('babel-core')
var rules = require('./rules')

var fileName = '../test/source.js'

fs.readFile(fileName, function(err, data) {
  if (err) throw console.log(err)

  var src = data.toString();

  var output = babel.transform(src, {
    plugins: [rules]
  })

  console.log(output.code)
});