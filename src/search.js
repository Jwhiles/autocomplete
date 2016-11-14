var fs = require('fs');
var path = require('path');
var search = module.exports = {};

var words = [];
var languages = {
  'en': 'english.txt',
  'fr': 'French.dic',
  'ge': 'German.dic',
  'gr': 'Greek.dic',
  'hu': 'Hungarian.dic',
  'it': 'Italian.dic',
  'du': 'Dutch.dic',
  'no': 'Norwegian.dic',
  'sp': 'Spanish.dic',
  'da': 'Danish.dic'

};

search.import = function (language, cb) {
  if (languages[language]) {
    fs.readFile(path.join(__dirname, 'dict', languages[language]), 'utf8', function (err, data) {
      words = data.split('\n');
      if (language !== 'en') {
        words = words.map(function (word) {
          word = word.split('/')[0].split('\t')[0];
          return word;
        });
      }
    //  console.log(words);
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
    // var firstIndex = false;

    for (var i = 0; i < data.length; i++) {
      // var currentMatch = false;
      if (pattern.test(data[i])) {
        // if (!firstIndex) {
        //   firstIndex = i;
        // }
        results.push(data[i]);
        // currentMatch = true;
      }
      if (results.length >= 50) {
        break;
      }
    }
    var responseObj = {};
    responseObj.results = results;
    responseObj.matchCount = results.length;
    cb(null, JSON.stringify(responseObj));
  });
};
