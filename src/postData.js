/* eslint-disable */
const dbConnect = require('./dbConnect');

function tableInsert(request) {
  let data = '';
  request.on('data', (chunk) => {
    data += chunk;
  });
  request.on('end', () => {
    doStuff(data);
  });
}

/* The object passed ot odstuff will be in this format:
{
title: string,
body: string,
cuisine: string,
ingredients: array of strings
}
*/

//we still need to change the queries for ingredients and cuisine such that if that row already exists we instead just return the id of the pre-existing row rather than writing a new one

function doStuff(object) {
  dbConnect.query(`INSERT INTO cuisines (name) VALUES ('${object.cuisine}') RETURNING ID;`), (err, res) => { //make insertion of the cuisine to the cuisines table, returning the ID
    if (err) throw err;
    const cuisineID = res.rows[0].id; //apparently this is how you get the id of the most recently inserted row
    dbConnect.query(`INSERT INTO recipes (title, body, cuisine_id) VALUES ('${object.title}', '${object.body}', '${cuisineID}') RETURNING ID;`, (err, res) => { //make an insertion to the recipes table with the title and the body coming from the user, and the cuisine_id being returned from the callback this is nested in
      if (err) throw err;
      const recipeID = res.rows[0].id;
      object.ingredients.forEach((e) => { // here we loop through the list of ingredients we've been given
        dbConnect.query(`INSERT INTO ingredients (name) VALUES ('${e}') RETURNING ID;`, (err, res) => { //we insert a row into the ingredients table for each item in the ingredients array that we get passed from the front end
          if (err) throw err;
          const ingredientID = res.rows[0].id;
          dbConnect.query(`INSERT INTO recipes_ingredients (recipe_id, ingredient_id) VALUES ('${recipeID}', '${ingredientID}')`); // in the callback for the insertion into the recipes table we make an insertion into the recipes_ingredients table using the id from the recipe returned 2 callbacks ago and the id for the ingredient we just got back.
        });
      });
    });
  };
}
