const qs = require('querystring');

const handlePost = (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    const recipeObj = qs.parse(data);
    recipeObj.ingredients = recipeObj.ingredients.split(',');
    console.log(recipeObj);
  });
  res.writeHead(302, { Location: '/thanks' });
  res.end();
};

module.exports = handlePost;
