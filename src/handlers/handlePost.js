const qs = require('querystring');
const postData = require('../postData.js');

const handlePost = (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    const recipeObj = qs.parse(data);
    recipeObj.ingredients = recipeObj.ingredients.split(',');
    console.log(recipeObj);
    postData.renameRecipe(recipeObj, postData.postData);
    res.writeHead(302, { Location: '/thanks' });
    res.end();
  });
};

module.exports = handlePost;
