const http = require('http');
const router = require('./router.js');
const server = http.createServer(router);
const port = (process.env.PORT || 8000);
server.listen(function () {
  console.log('Server running at port', port);
});
