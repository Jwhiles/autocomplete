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
  console.log(search, data)
  var results = !!search ? data.filter(function (val) {
    return val.indexOf(search) === 0
  }) : [];
  return results.slice(0, 5);
}

function updateHiddenInput (autoString) {
  document.getElementsByClassName('jsauto')[0].value = autoString;
}

function receive (data) {
  var totalUserInput = inp.value.split(' ');
  var searchWord = totalUserInput.pop();
  var firstSearchResult = (firstWord(searchWord, data) || searchWord);
  var existingInput = totalUserInput.length === 0 ? '' : totalUserInput.join(' ') + ' ';
  updateHiddenInput(existingInput + firstSearchResult);
}
