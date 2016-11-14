var fs = require('fs');
var path = require('path');
var search = module.exports = {};

var words = [];
var currentLanguage;
var languages = {
  'en': 'english.txt',
  'fr': 'French.dic',
  'ge': 'German.dic',
  'gr': 'Greek.dic',
  'hu': 'Hungarian.dic',
  'it': 'Italian.dic',
  'du': 'Dutch.dic',
  'no': 'Norwegian (Bokmal).dic',
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
  var data = words;
  if (language !== currentLanguage) {
    search.import(language, function (err, newData) {
      if (err) {
        cb('Problem Importing');
      }
      data = newData;
      currentLanguage = language;
      search.filterBy(searchTerm, data, cb);
    });
  } else {
    search.filterBy(searchTerm, data, cb);
  }
};

search.filterBy = function (searchTerm, data, cb) {
  var pattern = new RegExp('^' + searchTerm, 'i');
  var results = [];
  var firstIndex = data.findIndex(x => pattern.test(x));
  var lastIndex = data.length - (data.reverse().findIndex(x => pattern.test(x)));
  var trimmedData = data.reverse().slice(firstIndex, lastIndex);
  var totalMatches = 0;

  for (var i = 0; i < trimmedData.length; i++) {
    if (pattern.test(trimmedData[i]) && results.length < 50) {
      results.push(trimmedData[i]);
      totalMatches++;
    } else if (pattern.test(trimmedData[i]) && results.length >= 50) {
      totalMatches++;
    }
  }
  var responseObj = {};
  responseObj.results = results;
  responseObj.matchCount = totalMatches;
  cb(null, JSON.stringify(responseObj));
};

// Init
search.import('en', function (err, data) {
  if (err) {
    throw err;
  }
  currentLanguage = 'en';
  words = data;
});
