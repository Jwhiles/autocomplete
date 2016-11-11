var example = { 'results': ['bing', 'binge', 'bingey', 'binghi', 'bingle', 'bingo', 'bingy'], 'matchCount': 7 };

function firstWord (search, data) {
  return data.results.find(function(val) {
    return val.indexOf(search) === 0;
  })
  // return data.results[0].indexOf(search) === 0 ? data.results[0] : undefined;
}
