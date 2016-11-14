function getTopResults (search, data, caps) {
  var results = !!search ? data.filter(function (val) {
    return (val.toLowerCase().indexOf(search.toLowerCase()) === 0 && val.toLocaleLowerCase() !== search.toLocaleLowerCase());
  }) : [];
  return results.slice(0, 5).map(str => caps ? str.toUpperCase() : str);
}

function updateInputValue (autoString, elt) {
  if (elt.tagName !== 'INPUT') return 'element must be of type input';
  elt.value = autoString;
}

function showSelectBox (arr) {
  var listItems = document.querySelectorAll('.suggestion');
  listItems.forEach(function (item, index) {
    item.innerHTML = (arr[index] || '');
    if (!item.innerHTML) {
      item.style.display = 'none';
    } else {
      item.style.display = 'block';
    }

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
  updateInputValue(inp.value + charsToAdd, document.querySelector('.jsauto'));
  showSelectBox(topResults);
}

// Called when user hovers/clicks on result
function usersSelection (value) {
  var totalUserInput = inp.value.split(' '); // gets content of input box
  var searchWord = totalUserInput.pop(); // gets fin al chunk of input
  updateInputValue(inp.value + value.substring(searchWord.length) || '', document.querySelector('.jsauto'));
}
