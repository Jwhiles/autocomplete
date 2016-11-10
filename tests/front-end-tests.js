var test = require('tape');
var main = require("../public/js/main.js");


test('testing our server', function (t) {
  t.ok(main.good, "detects good func");
  t.end();
});
