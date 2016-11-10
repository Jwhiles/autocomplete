const handler = module.exports = {};
const fs = require('fs');
const path = require('path');
const url = require('url');

handler.home = function (request, response) {
  fs.readFile(path.join(__dirname, '../public/index.html'), function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    response.writeHead(200, {'Content-type': 'text/html'});
    response.write(data);
    response.end();
  });
};

handler.notFound = function (request, response) {
  response.writeHead(404, {'Content-type': 'text/html'});
  response.end('<h1>Resource not found</h1>');
};

handler.dict = function (request, response) {
  var urlParts = url.parse(request.url, true); // eg dict/en?lang=en&search=hello
  var lang = urlParts.query.lang;
  var search = urlParts.query.search;
  console.log('lang: ', lang, 'search: ', search);
  response.writeHead(200, {'Content-type': 'text/html'});
  response.end('<h1>word search!</h1>');
};
