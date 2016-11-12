function getTopResults (search, data, caps) {
  var results = !!search ? data.filter(function (val) {
    return (val.toLowerCase().indexOf(search.toLowerCase()) === 0 && val.toLocaleLowerCase() !== search.toLocaleLowerCase());
  }) : [];
  return results.slice(0, 5).map(str => caps ? str.toUpperCase() : str);
}

function updateHiddenInput (autoString) {
  document.getElementsByClassName('jsauto')[0].value = autoString;
}

function showSelectBox (arr) {
  var listItems = document.querySelectorAll('.suggestion');
  listItems.forEach(function (item, index) {
    item.innerHTML = (arr[index] || '');
    item.classList.remove('selected');
  });
  listItems[0].classList.add('selected');
  if (listItems[0].innerHTML) searchResults.style.display = 'inherit';
  else searchResults.style.display = 'none';
}

function receive (data, caps) {
  var totalUserInput = inp.value.split(' '); // gets content of input box
  var searchWord = totalUserInput.pop(); // gets fin al chunk of input
  var topResults = getTopResults(searchWord, data, caps);
  var firstResult = (topResults[0] || searchWord); // gets top match
  var charsToAdd = firstResult.substr(searchWord.length) || '';
  updateHiddenInput(inp.value + charsToAdd);
  showSelectBox(topResults);
}

// Called when user hovers/clicks on result
function usersSelection (value) {
  var totalUserInput = inp.value.split(' '); // gets content of input box
  var searchWord = totalUserInput.pop(); // gets fin al chunk of input
  updateHiddenInput(inp.value + value.substring(searchWord.length) || '');
}

// Needed - build list function that takes search word, data, searchResults container and builds list, call at the end of receive function.
// Build list function should first clear html of searchResults
// It should give first list item class of selected
// It needs to call hoverAndClickEventHandlers(); with ul element and .selected class name
