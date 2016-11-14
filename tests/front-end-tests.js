var QUnit = QUnit || {};

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

QUnit.test('myLanguage function should return the first 2 chars of the language', function (t) {
  t.ok(myLanguage('English') === 'en');
  t.equal(myLanguage('Spanish'), 'sp');
  t.equal(myLanguage('Hungarian'), 'hu');
});

QUnit.test('test filterResults function', function (t) {
  var testRes = ['able', 'abler', 'abloom', 'ablution', 'abnegate', 'abnegation', 'abnormal', 'abnormality', 'aboard'];
  var chunk = 'abn';
  t.deepEqual(filterResults(testRes, chunk), ['abnegate', 'abnegation', 'abnormal', 'abnormality']);
  var chunk = 'abl';
  t.deepEqual(filterResults(testRes, chunk), ['able', 'abler', 'abloom', 'ablution']);
});
// QUnit.test('keyRoutes function', function (t) {
//   inp.value = 'apple';
//   t.ok(keyRoutes('e') === buildUrl('/dict', 'en', 'apple'), 'should return a valid url');
//   inp.value = 'I have an apple';
//   t.ok(keyRoutes('e') === buildUrl('/dict', 'en', 'apple'));
//   // test enter
//   // test space
//   // test shift key?
// });
// test('test that keyRoutes() handles different key presses', function(t) {
//   //enter
//   t.ok(keyRoutes(13))
//   //space
//   //character
//   //other
//   t.ok()
// })

QUnit.test('test that our top results function works', function (t) {
  var example = ['bing', 'binge', 'bingey', 'binghi', 'bingle', 'bingo', 'bingy'];
  var shortExample = ['bing', 'binge'];
  var emptyExample = [];
  t.deepEqual(getTopResults('bing', example, false), ['binge', 'bingey', 'binghi', 'bingle', 'bingo'], 'returns the top five results as an array');
  t.deepEqual(getTopResults('bing', shortExample, false), ['binge'], 'returns as many results as possible if there are fewer than 5 matches');
  t.deepEqual(getTopResults('bingl', example, false), ['bingle'], 'returns only matching results');
  t.deepEqual(getTopResults('', example, false), [], 'returns an empty array if there is no search term');
  t.deepEqual(getTopResults('boo', emptyExample, false), [], 'returns an empty array if there the array is empty');
  t.deepEqual(getTopResults('bing', example, true), ['BINGE', 'BINGEY', 'BINGHI', 'BINGLE', 'BINGO'], 'returns capitalised results if caps is on');
});

// Test for updateHiddenInput
QUnit.test('updateHiddenInput can change input value', function (t) {
  var elt = document.createElement('input');
  elt.value = 'ONE';
  updateInputValue('TWO', elt);
  t.ok(elt.value === 'TWO', 'can change input value from one to two');
  var nonInput = document.createElement('button');
  var result = updateInputValue('TWO', nonInput);
  t.ok(typeof result == 'string', 'should return error message if input is not of type input');
});
