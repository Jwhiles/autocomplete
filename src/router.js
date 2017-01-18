const handler = require('./handler.js');
const path = require('path');

const routes = {
  '404': handler.notFound,
  '/': handler.home,
  '/dict': handler.dict,
  '.js': handler.files,
  '.css': handler.files,
  '.txt': handler.files
};

module.exports = function (request, response) {
  var url = request.url;
  var ext = path.extname(url);

  if (url.match('/dict')) {
    routes['/dict'](request, response);
  } else if (routes[ext]) {
    routes[ext](request, response, url);
  } else if (routes[url]) {
    routes[url](request, response);
  } else {
    routes[404](request, response);
  }
};
