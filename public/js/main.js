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
  if (char === 'Enter') { return; } else if (char === ' ') {
    return;
  } else {
    if (lastChunk(inp.value) !== undefined) {
      var url = buildUrl('/dict', 'en', lastChunk(inp.value));
      return url;
    }
  }
}
