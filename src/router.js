const handler = require('./handler.js');

const routes = {
  '404': handler.notFound,
  '/': handler.home,
  '/dict/en': handler.en
};

module.exports = function (request, response) {
  if (request.url.match('/dict/en')) {
    routes['/dict/en'](request, response);
  } else if (routes[request.url]) {
    routes[request.url](request, response);
  } else {
    routes[404](request, response);
  }
};
