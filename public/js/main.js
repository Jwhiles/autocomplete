// // GLOBALS

var globalData = {};
// Holds latestChunk word chunk, e.g. for 'the cat in the ha', latestChunk = 'ha'
var latestChunk;

var inp = document.querySelector('.main');
var searchResults = document.querySelector('.search-results');

// // DOM Manipulation

inp.addEventListener('keyup', function (event) {
  latestChunk = lastChunk(inp.value);
  console.log(latestChunk);
  console.log(globalData);
  keyRoutes(inp.value, event.key);
});

// // HELPER FUNCTIONS

// Waterfall function to take series of arync functions
function waterfall (arg, tasks, cb) {
  var next = tasks[0];
  var tail = tasks.slice(1);
  if (typeof next !== 'undefined') {
    next(arg, function (error, result) {
      if (error) {
        cb(error);
      }
      waterfall(result, tail, cb);
    });
  }
  cb(null, arg);
}

// Takes url e.g /dict?lang=en&search=a and a callback (can be used in waterfall)
function requestJSON (url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function (response) {
    // console.log(response.currentTarget.response)
    cb(null, response.currentTarget.response);
  });
  xhr.addEventListener('error', function (err) {
    cb(err);
  });
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.send();
}
// Builds url to give to server
function buildUrl (endpoint, lang, value) {
  if (arguments.length !== 3) {
    return undefined;
  }
  return endpoint + '?lang=' + lang + '&search=' + value;
}
// Takes string, checks last word/chunk, returns it (if it contains bad characters, returns undefined)
function lastChunk (value) {
  value = value.toLowerCase().split(' ').pop();
  if ((/^[a-z]([a-z-])*$/ig).test(value) === false) {
    return undefined;
  }
  return value;
}
// Filters array based on start of chunk
function filterResults (array, chunk) {
  if (!array) {
    return [];
  }
  array = array.filter(function (item) {
    var pattern = new RegExp('^' + chunk, 'i');
    return pattern.test(item);
  });
  return array;
}

// // MAIN KEY ROUTER FUNCTIONS

function onEnter (input) {
  var selectedValue = document.querySelector('.jsauto').value;
  if (selectedValue !== input) {
    inp.value = selectedValue;
  } else {
    inp.value = '';
  }
  // onAutoComplete
}

function onSelect (value) {
  var text = inp.value.split(' ');
  text.pop();
  text.push(value);
  inp.value = text.join(' ');
}

function onSpace () {
  clearSuggestionsContainer();
}

function onBackSpace () {
  console.log('backspace');
  onLetter(latestChunk);
}

function onOddKey () {
  clearSuggestionsContainer();
}

function clearSuggestionsContainer () {
  // Assumes search-results container contains ul element
  searchResults.children[0].innerHTML = '';
}

function onLetter (input) {
  if (lastChunk(input) !== undefined) {
    console.log('hello');
    // If users stored results contains results from their new word chunk, then send new filtered array...
    var newFilteredArray = filterResults(globalData.results, lastChunk(input));
    if (newFilteredArray.length) {
      // to receive function in json-handler.js
      console.log('recieve once')
      receive(newFilteredArray);
    } else {
      // If no results, then send request to server for data
      var url = buildUrl('/dict', 'en', lastChunk(input));
      waterfall(url, [requestJSON], function (err, json) {
        if (err) {
          throw err;
        }
        else {
          // Store server data, to receive function in json-handler.js
          handleJSON(json);
          console.log('recieve again');

          receive(globalData.results);
        }
      });
    }
  } else {
    clearSuggestionsContainer();
  }
}

// handles routes
function keyRoutes (inp, char) {
  if (char === 'Enter') {
    onEnter(inp);
  } else if (char === ' ') {
    onSpace(inp);
  } else if (char === 'Backspace') {
    onBackSpace(inp);
  } else if (lastChunk(inp) !== undefined) {
    console.log(inp, 'letter!')
    onLetter(inp);
  } else {
    onOddKey(inp);
  }
}

// handleJSON
function handleJSON (json) {
  var newData = json;
  globalData.results = newData.results;
  globalData.matchCount = newData.matchCount;
}
