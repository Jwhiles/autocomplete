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

function keyRoutes (char) {
  if (char === 'Enter') {
    // stuff will happen here
    return;
  } else if (char === ' ') {
    // and heres
    return;
  } else {
    // if value search
    if (lastChunk(inp.value) !== undefined) {
      // call a function which checks if our locally stored results have data
      // if they dont, when we do a waterfall method of build url, request json, and do something with json
      var url = buildUrl('/dict', 'en', lastChunk(inp.value));
      return url;
    }
  }
}
