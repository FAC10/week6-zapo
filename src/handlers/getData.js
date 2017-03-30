const dbConnection = require('../../database/db_connection.js');

const getData = (cb) => {
  dbConnection.query('SELECT recipes_org.title, recipes_org.body, cuisine.name AS cuis_name, array(SELECT ingredients.name FROM ingredients INNER JOIN recipe_ingredients ON ingredients.id = recipe_ingredients.ingredient_id INNER JOIN recipes ON recipes.id = recipe_ingredients.recipe_id WHERE (SELECT recipes.id FROM recipes WHERE recipes_org.title = title) = recipes.id) AS ingredients FROM recipes AS recipes_org INNER JOIN cuisine ON recipes_org.cuisine_id = cuisine.id', (err, res) => {
    if (err) {
      cb(err);
    } else {
      return cb(null, res.rows);
    }
  });
};

module.exports = getData;
