var fs = require('fs');
var path = require('path');
var search = {};
var file = path.join(__dirname, '/dict.txt');
console.log(file);

var words = [];

search.import = function (cb) {
  fs.readFile(file, 'utf8', function (err, data) {
    words = data.split('\n');
  //  console.log(words);
    cb(err, words);
  });
};

/* search.find = function () {

}; */

search.import(function (err, data) {
  if (err) {
    throw err;
  } else {
    console.log(data);
  }
});
module.exports = search;
