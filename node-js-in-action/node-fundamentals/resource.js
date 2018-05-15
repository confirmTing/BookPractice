const http = require('http');
const fs = require('fs');
const path = require('path');
const print = require('../../utils');

const resourceJsonPath = path.resolve(__dirname, './resource.json');
const stream = fs.createReadStream(resourceJsonPath);

console.log('path', resourceJsonPath);
stream.on('data', chunk => {
  console.log(chunk);
});

stream.on('end', () => {
  console.log('finished');
});

const server = http.createServer();
server.on('request', (req, res) => {
  res.writeHead(200, {'content-type': 'application/json'});
  fs.createReadStream(resourceJsonPath).pipe(res);
});
server.listen(3000);
console.log('Server running at http://localhost:3000');
