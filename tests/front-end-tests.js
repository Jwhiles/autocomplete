QUnit.test('test that buildUrl returns a url formatted string', function (t) {
  t.ok(typeof buildUrl('/dict', 'en', 'a') === 'string', 'should return a string');
  t.ok(buildUrl('/dict', 'en', 'a') === '/dict?lang=en&search=a', 'should return properly formatted url');
  t.ok(buildUrl('/dict', 'en') === undefined, 'when third parameter missing, should return undefined');
  t.ok(buildUrl('/dict') === undefined, 'when second and third parameter missing, should return undefined');
});

QUnit.test('test that lastChunk() returns a valid search value', function (t) {
  var text = lastChunk('This is a string');
  t.ok(typeof text === 'string', 'should return a string');
  t.ok(lastChunk('This is a string') === 'string');
  t.ok(lastChunk('This is a st?ring') === undefined, 'if special character, return undefined');
  t.ok(lastChunk('THIS IS A STRING') == 'string', 'should return a lower case string');
  t.ok(lastChunk('This is a -') === undefined, 'should return undefined if first or last letter is a dash');
});

QUnit.test('keyRoutes function', function (t) {
  inp.value = 'apple';
  t.ok(keyRoutes('e') === buildUrl('/dict', 'en', 'apple'), 'should return a valid url');
  inp.value = 'I have an apple';
  t.ok(keyRoutes('e') === buildUrl('/dict', 'en', 'apple'));
  // test enter
  // test space
  // test shift key?
});
// test('test that keyRoutes() handles different key presses', function(t) {
//   //enter
//   t.ok(keyRoutes(13))
//   //space
//   //character
//   //other
//   t.ok()
// })

QUnit.test('test that our JSON handler works', function (t) {
  var example = { 'results': ['bing', 'binge', 'bingey', 'binghi', 'bingle', 'bingo', 'bingy'], 'matchCount': 7 };
  t.equal(firstWord('bing', example), 'bing', 'Gets the first result');
  t.equal(firstWord('hahaha', example), undefined, 'Should return undefined term if there is no match');
  t.equal(firstWord('binge', example), 'binge', "Gets the first matching result if the first word doesn't match");
  t.equal(firstWord('', example), undefined, 'Should return undefined if no search string is provided');
})
