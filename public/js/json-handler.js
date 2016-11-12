var example = { 'results': ['bing', 'binge', 'bingey', 'binghi', 'bingle', 'bingo', 'bingy'], 'matchCount': 7 };

function firstWord (search, data) {
  var results = getTopResults(search, data);
  if (results.length > 1 && results[0] === search) {
    return results[1];
  }
  // console.log(results[0]);
  return results[0];
}

function getTopResults (search, data) {
  var results = search ? data.filter(function (val) {
    return (val.toLowerCase().indexOf(search.toLowerCase()) === 0 && val.toLocaleLowerCase() !== search.toLocaleLowerCase());
  }) : [];
  return results.slice(0, 5);
}

function updateHiddenInput (autoString) {
  document.getElementsByClassName('jsauto')[0].value = autoString;
}

function receive (data) {
  var totalUserInput = inp.value.split(' '); // gets content of input box
  var searchWord = totalUserInput.pop(); // gets fin al chunk of input
  var firstSearchResult = (firstWord(searchWord, data) || searchWord); // gets top match

  var charsToAdd = firstSearchResult.substr(searchWord.length) || '';

  // var existingInput = totalUserInput.length === 0 ? '' : totalUserInput.join(' ') + ' ';
  // var newWords = (existingInput + firstSearchResult).split('');
  // var oldWords = inp.value.split('');
  // newWords.forEach(function (val, indx) {
  //   if (oldWords[indx]) { newWords[indx] = oldWords[indx]; }
  // });
  updateHiddenInput(inp.value + charsToAdd);
  // Needed - build function that clears and generates list items from top results
  buildListItems(searchWord, data, searchResults);
}

// Called when user hovers/clicks on result
function usersSelection (value) {
  var totalUserInput = inp.value.split(' '); // gets content of input box
  var searchWord = totalUserInput.pop(); // gets fin al chunk of input
  updateHiddenInput(inp.value + value.substring(searchWord.length) || '');
}

function buildListItems (search, data, container) {
  data = getTopResults(search, data);
  // reset
  container.innerHTML = '';

  var ul = document.createElement('ul');
  var htmlStr = '';

  data.forEach(function (item, index) {
    if (!index) {
      htmlStr += '<li class="suggestion selected">' + item + '</li>';
    } else {
      htmlStr += '<li class="suggestion">' + item + '</li>';
    }
  });
  ul.innerHTML = htmlStr;
  container.appendChild(ul);
  hoverAndClickEventHandlers(ul, 'selected');
}
