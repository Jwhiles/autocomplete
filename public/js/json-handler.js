var example = { 'results': ['bing', 'binge', 'bingey', 'binghi', 'bingle', 'bingo', 'bingy'], 'matchCount': 7 };

// function firstWord (search, data) {
//   return !!search && data.length !== 0 ? data.find(function(val) {
//     return val.indexOf(search) === 0;
//   }) : undefined;
// }

function firstWord (search, data) {
  var results = getTopResults(search, data);
  if (results.length > 1 && results[0] === search) {
    return results[1];
  }
  return results[0];
}

function getTopResults (search, data) {
  console.log(search, data);
  var results = !!search ? data.filter(function (val) {
    return val.toLowerCase().indexOf(search.toLowerCase()) === 0;
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
}
