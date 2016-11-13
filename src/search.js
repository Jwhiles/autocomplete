var fs = require('fs');
var path = require('path');
var search = module.exports = {};

var words = [];
var languages = {
  'en': 'english.txt',
  'fr': 'french.txt',
  'it': 'italian.txt',
  'du': 'dutch.txt',
  'no': 'norwegian.txt',
  'sp': 'spanish.txt',
  'da': 'danish.txt'

};

search.import = function (language, cb) {
  if (languages[language]) {
    fs.readFile(path.join(__dirname, 'dict', languages[language]), 'utf8', function (err, data) {
      words = data.split('\n');
      cb(err, words);
    });
  } else {
    cb('Cant find dictionary');
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
    var pattern = new RegExp('^' + searchTerm, 'i');
    var results = [];
    var firstIndex = false;

    for (var i = 0; i < data.length; i++) {
      var currentMatch = false;
      if (pattern.test(data[i])) {
        if (!firstIndex) {
          firstIndex = i;
        }
        results.push(data[i]);
        currentMatch = true;
      }
      if (currentMatch === false && results.length) {
        break;
      }
    }
    var responseObj = {};
    responseObj.results = data.length >= 50 ? results.slice(0, 50) : results;
    responseObj.matchCount = results.length;
    cb(null, JSON.stringify(responseObj));
  });
};
