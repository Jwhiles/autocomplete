var globalResults = [];
var latestCount;

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

// Takes url e.g /dict?lang=en&search=a and callback
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

function buildUrl (endpoint, lang, value) {
  if (arguments.length !== 3) {
    return undefined;
  }
  return endpoint + '?lang=' + lang + '&search=' + value;
}

function lastChunk (value) {
  value = value.toLowerCase().split(' ').pop();
  if ((/^[a-z]([a-z-])*$/ig).test(value) === false) {
    return undefined;
  }
  return value;
}

var inp = document.querySelector('input');

inp.addEventListener('keyup', function (event) {
  lastChunk(inp.value);
  document.getElementsByClassName('test')[0].innerHTML = lastChunk(inp.value);
  keyRoutes(event.key);
});

function filterResults (array, chunk) {
  array = array.filter(function (item) {
    var pattern = new RegExp('^' + chunk, 'i');
    return pattern.test(item);
  });
  return array;
}

function onSpace () {
  // bin/remove suggestionbox
}

function checkArray (word) {}

function keyRoutes (char) {
  if (char === 'Enter') {
    // stuff will happen here
    return;
  } else if (char === ' ') {
    onSpace();
    // and heres
    return;
  } else {
    // if value search
    if (lastChunk(inp.value) !== undefined) {
      // call a function which checks if our locally stored results have data
      // if they dont, when we do a waterfall method of build url, request json, and do something with json
      globalResults = filterResults(globalResults, lastChunk(inp.value));
      if (globalResults) {
        // send results to DOM list builder
        return;
      } else {
        var url = buildUrl('/dict', 'en', lastChunk(inp.value));
        waterfall(url, [requestJSON], function (err, res) {
          if (err) throw err;
          else {
          //  receiveJSON();
            // function from the others :)
          }
        });
      }
    }
  }
}
