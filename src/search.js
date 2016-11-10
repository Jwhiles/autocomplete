var fs = require('fs');
var path = require('path');
var search = {};
var file = path.join(__dirname, '/dict.txt');
console.log(file);

var words = [];

search.import = function (cb) {
  fs.readFile(file, 'utf8', function (err, data) {
    words = data.split('\n');
    cb(err, words);
  });
};

search.find = function (searchTerm) {
  search.import(function (err, data) {
    console.log(searchTerm);
    if (err) {
      throw err;
    }
    var pattern = new RegExp('^' + searchTerm, 'gi');
    console.log(pattern);
    var results = [];
    data.forEach(function (val, indx) {
      if (pattern.test(val)) {
        results.push(val);
      }
    });
    console.log(results);
  });
};

// search.import(function (err, data) {
//   if (err) {
//     throw err;
//   } else {
//     console.log('hello', words.length);
//   }
// });

search.find('hel');
module.exports = search;
