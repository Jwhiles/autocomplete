var fs = require('fs');
var path = require('path');
var search = module.exports = {};
var file = path.join(__dirname, '/dict.txt');

var words = [];

search.import = function (language, cb) {
  if (language === 'en') {
    fs.readFile(file, 'utf8', function (err, data) {
      words = data.split('\n');
      cb(err, words);
    });
  }
};

search.find = function (searchTerm, language, cb) {
  if (arguments.length !== 3) {
    return ('Not Enough Arguments');
  }
  search.import(language, function (err, data) {
    if (err) {
      cb(err);
    }
    var pattern = new RegExp('^' + searchTerm, 'gi');
    var results = [];

    for (var i = 0; i < data.length; i++) {
      var currentMatch = false;
      if (pattern.test(data[i])) {
        results.push(data[i]);
        currentMatch = true;
      }
      if (currentMatch === false && results.length) {
        break;
      }
    }
    var responseObj = {};
    responseObj.results = data.length >= 50 ? data.slice(0, 50) : data;
    responseObj.matchCount = results.length;
    cb(null, JSON.stringify(responseObj));
  });
};
