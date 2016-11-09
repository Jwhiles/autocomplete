const handler = require('./handler.js');

const routes = {
  '404': handler.notFound,
  '/': handler.home
};

module.exports = function (request, response) {
  if (routes[request.url]) {
    routes[request.url](request, response);
  } else {
    routes[404](request, response);
  }
};
