const http = require('http');
// http.createServer((req, res) => {
//   res.writeHead(200, {
//     'content-type': 'text/plain'
//   });
//   res.end('Hello World!\n');
// }).listen(3000);

const server = http.createServer();
server.on('request', (req, res) => {
  res.writeHead(200, {'content-type': 'text/plain'});
  res.end('Hello Ethan~');
});

server.listen(3000);

console.log('Server running at http://localhost:3000/');
