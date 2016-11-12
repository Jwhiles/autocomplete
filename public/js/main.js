// // GLOBALS

var globalData = {};
// Holds latestChunk word chunk, e.g. for 'the cat in the ha', latestChunk = 'ha'
var latestChunk;

var inp = document.querySelector('.main');
var disabledInp = document.querySelector('.jsauto');
var searchResults = document.querySelector('.search-results');

// // DOM Manipulation

inp.addEventListener('keyup', function (event) {
  latestChunk = lastChunk(inp.value);
  if (!inp.value) {
    clearAll();
  } else if (!latestChunk) {
    clearDisabledInp();
  }
  keyRoutes(inp.value, event.key);
});

function addClassOnHover (container, className) {

  function removeClasses () {
    [].forEach.call(container.children, function (child) {
      child.classList.remove(className);
    });
  }
  container.addEventListener('mouseover', function (event) {
    removeClasses();
    event.target.classList.add(className);
  });
  container.addEventListener('mouseleave', function () {
    removeClasses();
    container.children[0].classList.add(className);
  });
}

addClassOnHover(document.querySelector('ul'), 'selected');

// // HELPER FUNCTIONS
// Clear functions
function clearAll () {
  disabledInp.value = inp.value = '';
}
function clearDisabledInp () {
  disabledInp.value = '';
}

// Waterfall function to take series of arync functions
function waterfall (arg, tasks, cb) {
  var next = tasks[0];
  var tail = tasks.slice(1);
  if (typeof next !== 'undefined') {
    next(arg, function (error, result) {
      if (error) {
        cb(error);
      } else {
        waterfall(result, tail, cb);
      }
    });
  } else {
    cb(null, arg);
  }
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
  if (!value) return undefined;
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
    return (pattern.test(item) && item.length > 1);
  });
  return array;
}

// // MAIN KEY ROUTER FUNCTIONS

function onEnter (input) {
  if (disabledInp.value !== input) {
    inp.value = disabledInp.value;
  } else {
    inp.value = '';
  }
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
  onLetter(latestChunk);
}

function onOddKey () {
  clearSuggestionsContainer();
}

function clearSuggestionsContainer () {
  // Assumes search-results container contains ul element
  // searchResults.children[0].innerHTML = '';
}

function onLetter (input) {
  if (lastChunk(input) !== undefined) {
    // If users stored results contains results from their new word chunk, then send new filtered array...
    var newFilteredArray = filterResults(globalData.results, lastChunk(input));
    if (newFilteredArray.length) {
      // to receive function in json-handler.js
      receive(newFilteredArray);
    } else {
      // If no results, then send request to server for data
      var url = buildUrl('/dict', 'en', lastChunk(input));
      waterfall(url, [requestJSON], function (err, json) {
        if (err) {
          throw err;
        } else {
          handleJSON(json);
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
    // onEnter(inp);
  } else if (char === ' ') {
    // onSpace(inp);
  } else if (char === 'Backspace') {
    // onBackSpace(inp);
  } else if (lastChunk(inp) !== undefined) {
    // onLetter(inp);
  } else {
    // onOddKey(inp);
  }
}

// handleJSON
function handleJSON (json) {
  var newData = json;
  globalData.results = newData.results;
  globalData.matchCount = newData.matchCount;
}
