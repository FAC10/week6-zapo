const fs = require('fs');

const handlers = {};

const extensionType = {
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  ico: 'image/x-icon',
};

handlers.home = (req, res) => {
  fs.readFile(`${__dirname}/../../public/index.html`, (err, file) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end(`<h1>${err.message}, sorry!</h1>`);
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(file);
  });
};

handlers.public = (req, res) => {
  const endpoint = req.url;
  fs.readFile(`${__dirname}/../..${endpoint}`, (err, file) => {
    if (err || endpoint.includes('..')) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>500 Server Error, sorry!</h1>');
      return;
    }
    const extension = endpoint.split('.')[1];
    res.writeHead(200, { 'Content-Type': extensionType[extension] });
    res.end(file);
  });
};

handlers.notFound = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.end('<h1>404 Page Requested Cannot be Found</h1>');
};

module.exports = handlers;
