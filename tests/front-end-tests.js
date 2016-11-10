var test = require('tape');
var main = require("../public/js/main.js");


test('test that tests are working!', function (t) {
  t.ok(main.good, "detects good func");
  t.end();
});

test('test that buildUrl returns a url formatted string', function (t) {
  t.ok(typeof main.buildUrl("/dict", "en", "a") == "string", "should return a string");
  t.ok(main.buildUrl("/dict", "en", "a") == "/dict?lang=en&search=a", "should return properly formatted url");
  t.ok(main.buildUrl("/dict", "en") === undefined, "when third parameter missing, should return undefined");
  t.ok(main.buildUrl("/dict") === undefined, "when second and third parameter missing, should return undefined");
  t.end();
})
