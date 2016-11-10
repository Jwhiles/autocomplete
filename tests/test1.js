const test = require('tape');
const search = require('../src/search.js');

test('test loading dictionary', function (t) {
  search.import(function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    t.ok(data);
    t.end();
  });
});
test('test dictionary is expected length', function (t) {
  search.import(function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    t.equal(data.length, 235887);
    t.end();
  });
});
