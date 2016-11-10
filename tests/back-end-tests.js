const test = require('tape');
const search = require('../src/search.js');

test('Testing Search', function (t) {
  // Testing Search can import dictionary
  search.import('en', function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    t.equal(data.length, 235887, 'It can import a big file');
  });
  // Can handle /dict?lang=en&search=ang
  search.find('ang', 'en', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      t.ok(JSON.parse(data), 'It will return JSON results when given correctly formatted url');
    }
  });
  // Will fail when not enough arguments given
  t.ok(typeof search.find('ang', 'en') === 'string', 'Should fail when not enough arguments provided');
  t.end();
});
