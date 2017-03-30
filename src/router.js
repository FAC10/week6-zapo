const handlers = require('./handlers/handlers');

// Thanks for the sweet router Dan!
// https://github.com/sofer/sssk/blob/master/router.js
// const routes = {
//   '/': handlers.home,
//   '/public': handlers.public,
//   '404': handlers.notFound,
// };

const router = (req, res) => {
  const endpoint = req.url;
  if (endpoint === '/') {
    handlers.home(req, res);
  } else if (endpoint.includes('public')) {
    handlers.public(req, res);
  } else {
    handlers.notFound(req, res);
  }
};

module.exports = router;
