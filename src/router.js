const handler = require('./handler.js');

const routes = {
  '404': handler.notFound,
  '/': handler.home,
  '/dict': handler.dict
};

module.exports = function (request, response) {
  if (request.url.match('/dict')) {
    routes['/dict'](request, response);
  } else if (routes[request.url]) {
    routes[request.url](request, response);
  } else {
    routes[404](request, response);
  }
};
