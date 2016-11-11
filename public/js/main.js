// // GLOBALS

var globalData = {};
var latestChunk;

var inp = document.querySelector('input');

// // DOM Manipulation

inp.addEventListener('keyup', function (event) {
  latestChunk = lastChunk(inp.value);
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
    cb(null, response.responseText);
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
  array = array.filter(function (item) {
    var pattern = new RegExp('^' + chunk, 'i');
    return pattern.test(item);
  });
  return array;
}

// // MAIN KEY ROUTER FUNCTIONS

function onEnter () {
  // if top result then call function to turn input value into input value + result, then clear everything
  // if no results then ignore
}

function onSpace () {
  clearSuggestionsContainer();
}

function onBackSpace () {
  onLetter(latestChunk);
}

function onOddKey () {
  clearSuggestionsContainer();
}

function clearSuggestionsContainer(){
  // clear inner suggestions container
}

function onLetter (input) {
  if (lastChunk(input) !== undefined) {
    var newFilteredArray = filterResults(globalData.results, lastChunk(input);
    if (newFilteredArray.length) {
      // send john and emily newFilteredArray
    } else {
      var url = buildUrl('/dict', 'en', lastChunk(input));
      waterfall(url, [requestJSON], function (err, json) {
        if (err) throw err;
        else {
          handleJSON(json);
          // send John and emily globalData.results;
        }
      });
    }
  } else {
    // clear suggestions container
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
    onLetter(inp);
  } else {
    onOddKey(inp);
  }
}


// handleJSON
function handleJSON(json){
  var newData = JSON.parse(json);
  globalData.results = newData.results;
  globalData.matchCount = newData.matchCount;
}
