const handler = module.exports = {};
const fs = require('fs');
const path = require('path');
const url = require('url');
const search = require('./search');

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
<<<<<<< HEAD
  var urlParts = url.parse(request.url, true); // eg dict/en?lang=en&search=hello
  var lang = urlParts.query.lang;
  var search = urlParts.query.search;
  console.log('lang: ', lang, 'search: ', search);
  response.writeHead(200, {'Content-type': 'text/html'});
  response.end('<h1>word search!</h1>');
=======
  let urlParts = url.parse(request.url, true); // eg dict/en?lang=en&search=hello
  let lang = (urlParts.query.lang || 'en');
  let searchTerm = urlParts.query.search;
  if (!searchTerm) {
    return;
  }
  search.find(searchTerm, lang, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      response.writeHead(200, {'Content-type': 'text/json'});
      response.end(data);
    }
  });
>>>>>>> 70ba46bea9e8cabf1d3cd695fd7eb7d577fd6b2a
};
