const test = require('tape');
const search = require('../src/search.js');

test('Testing Search', function (t) {
  // Testing Search can import dictionary
  search.import('en', function (err, data) {
    if (err) {
      throw err;
    }
    t.ok(data.length > 1000, 'It can import a big file');
  });
  // Can handle /dict?lang=en&search=ang
  search.find('bing', 'en', function (err, data) {
    if (err) {
      throw err;
    } else {
      t.ok(JSON.parse(data), 'It will return JSON results when given correctly formatted url');
    }
  });
  // Can handle /dict?lang=fr&search=très
  search.find('tre', 'fr', function (err, data) {
    if (err) {
      throw err;
    } else {
      t.ok(JSON.parse(data), 'It can handle different languages');
    }
  });
  // Will fail when not enough arguments given
  t.ok(typeof search.find('ang', 'en') === 'string', 'Should fail when not enough arguments provided');
  t.end();
});
