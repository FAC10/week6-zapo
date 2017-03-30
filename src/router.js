const handlers = require('./handlers/handlers');

const pages = {
  '/form': 'form.html',
  '/thanks': 'thanks.html',
};

const router = (req, res) => {
  const endpoint = req.url;
  if (endpoint === '/') {
    handlers.home(req, res);
  } else if (pages[endpoint]) {
    handlers.page(req, res);
  } else if (endpoint.includes('public')) {
    handlers.public(req, res);
  } else if (endpoint === '/submit') {
    handlers.post(req, res);
  } else {
    handlers.notFound(req, res);
  }
};

module.exports = router;
