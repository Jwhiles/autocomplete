var example = { 'results': ['bing', 'binge', 'bingey', 'binghi', 'bingle', 'bingo', 'bingy'], 'matchCount': 7 };

function firstWord (search, data) {
  return !!search && data.matchCount !== 0 ? data.results.find(function(val) {
    return val.indexOf(search) === 0;
  }) : undefined;
}

function getTopResults (search, data) {
  var results = !!search ? data.results.filter(function (val) {
    return val.indexOf(search) === 0
  }) : [];
  return results.slice(0, 5);
}

function updateHiddenInput (autoString) {
  document.getElementsByClassName('jsauto')[0].value = autoString;
}

function receiveJSON(data) {

}
