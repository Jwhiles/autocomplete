// // GLOBALS

var globalData = {};
// Holds latestChunk word chunk, e.g. for 'the cat in the ha', latestChunk = 'ha'
var latestChunk;

var inp = document.querySelector('.main-input');
var disabledInp = document.querySelector('.jsauto');
var searchResults = document.querySelector('.search-results');
var language = 'en';

function myLanguage (lang) {
  language = lang.toLowerCase().slice(0, 2);
  return language;
}
// // DOM Manipulation

inp.addEventListener('keyup', function (event) {
  latestChunk = lastChunk(inp.value);
  if (!inp.value) {
    clearAll();
  } else if (!latestChunk) {
    clearDisabledInp();
  }
  var caps = isCapslock(event);
  keyRoutes(inp.value, event.key, caps);
});

/* Takes container(ul) and classname(selected), adds classname on hover for each,
    when hovered out of container the first element holds the classname.
    On hover/click, usersSelection is fired with users selection
    Needs to be called inside json-handler after generating list elements */
function hoverAndClickEventHandlers (container, className) {
  if (!container.children) return;

  function removeClasses () {
    [].forEach.call(container.children, function (child) {
      child.classList.remove(className);
    });
  }
  container.addEventListener('mouseover', function (event) {
    removeClasses();
    event.target.classList.add(className);
    usersSelection(event.target.textContent);
  });
  container.addEventListener('mouseleave', function () {
    removeClasses();
    container.children[0].classList.add(className);
    usersSelection(container.children[0].textContent);
  });
  container.addEventListener('click', function (event) {
    usersSelection(event.target.textContent);
    onEnter(inp.value);
  });
}

// Remove this function call after json-handler functions built
hoverAndClickEventHandlers(document.querySelector('ul'), 'selected');

// Allows arrow keys to cycle through classes dpeneding on direction
function shiftClass (container, className, direction) {
  if (!container.children) return;

  var initial = document.querySelector('.' + className);

  var previous = initial.previousElementSibling;
  var next = initial.nextElementSibling;

  if (direction === 'up' && previous) {
    initial.classList.remove(className);
    previous.classList.add(className);
    usersSelection(previous.textContent);
  } else if (direction === 'down' && next) {
    initial.classList.remove(className);
    next.classList.add(className);
    usersSelection(next.textContent);
  }
}

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
  if ((/^[a-zÀ-ÿ]([a-z-À-ÿ])*$/ig).test(value) === false) {
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
  clearSuggestionsContainer();
}

function onSpace () {
  globalData = {};
  clearSuggestionsContainer();
}

function onBackSpace () {
  onLetter(latestChunk);
}

function onOddKey () {
  clearSuggestionsContainer();
}

function onUpKey () {
  shiftClass(searchResults, 'selected', 'up');
}

function onDownKey () {
  shiftClass(searchResults, 'selected', 'down');
}

function clearSuggestionsContainer () {
  searchResults.style.display = 'none';
}

function onLetter (input, caps) {
  if (lastChunk(input) !== undefined) {
    // If users stored results contains results from their new word chunk, then send new filtered array...
    var newFilteredArray = filterResults(globalData.results, lastChunk(input));
    if (newFilteredArray.length) {
      // to receive function in json-handler.js
      receive(newFilteredArray, caps);
    } else {
      // If no results, then send request to server for data
      // var url = buildUrl('/dict', 'en', lastChunk(input));
      var url = buildUrl('/dict', language, lastChunk(input));
      waterfall(url, [requestJSON], function (err, json) {
        if (err) {
          throw err;
        } else {
          handleJSON(json);
          receive(globalData.results, caps);
        }
      });
    }
  } else {
    clearSuggestionsContainer();
  }
}

// handles routes
function keyRoutes (inp, char, caps) {
  if (char === 'Enter') {
    onEnter(inp);
  } else if (char === ' ') {
    onSpace(inp);
  } else if (char === 'Backspace') {
    onBackSpace(inp);
  } else if (char === 'ArrowUp') {
    onUpKey();
  } else if (char === 'ArrowDown') {
    onDownKey();
  } else if (lastChunk(inp) !== undefined) {
    onLetter(inp, caps);
  } else {
    onOddKey(inp);
  }
}

function isCapslock (e) {
  if (e.key === 'Shift') return;
  var key = e.key;
  var shifton = false;
  if (e.shiftKey) {
    shifton = e.shiftKey;
  }
    // caps on
  if (key.toUpperCase() === key && !shifton) {
    return true;
  }
  return false;
}

// handleJSON
function handleJSON (json) {
  var newData = json;
  globalData.results = newData.results;
  globalData.matchCount = newData.matchCount;
}
