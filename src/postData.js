/* eslint-disable */
const dbConnect = require('../database/db_connection.js');

function tableInsert(request) {
  let data = '';
  request.on('data', (chunk) => {
    data += chunk;
  });
  request.on('end', () => {
    postData(data);
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

function renameRecipe(obj, cb){
  dbConnect.query(`SELECT exists(SELECT title FROM recipes WHERE recipes.title = '${obj.title}') FROM recipes LIMIT 1;`, (err, res) => {
    if (err) {
      cb(err);
    }
    else if(res.rows[0].exists) {
        obj.title += '*';
        renameRecipe(obj, cb);
    } else{
      cb(null, obj);
    }
  });
}



function postData(err, object) {
  dbConnect.query(`SELECT exists(SELECT name FROM cuisine WHERE cuisine.name = '${object.cuisine}') FROM cuisine LIMIT 1;`, (err, res) => {
    if(res.rows[0].exists) {
      dbConnect.query(`INSERT INTO recipes (title, body, cuisine_id) VALUES ('${object.title}', '${object.body}', (SELECT id FROM cuisine WHERE cuisine.name = '${object.cuisine}')) RETURNING ID;`, (err, res) => { //make an insertion to the recipes table with the title and the body coming from the user, and the cuisine_id being returned from the callback this is nested in
        if (err) throw err;
        const recipeID = res.rows[0].id;
        dealWithIngredients(object.ingredients, () => {
          object.ingredients.forEach((e) => {
            dbConnect.query(`INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (${recipeID}, (SELECT id FROM ingredients WHERE ingredients.name = '${e}'))`)
          })
        })
      });
    } else {

  dbConnect.query(`INSERT INTO cuisine (name) VALUES ('${object.cuisine}') RETURNING ID;`), (err, res) => { //make insertion of the cuisine to the cuisines table, returning the ID
    if (err) throw err;
    const cuisineID = res.rows[0].id; //apparently this is how you get the id of the most recently inserted row
    dbConnect.query(`INSERT INTO recipes (title, body, cuisine_id) VALUES ('${object.title}', '${object.body}', ${cuisineID}) RETURNING ID;`, (err, res) => { //make an insertion to the recipes table with the title and the body coming from the user, and the cuisine_id being returned from the callback this is nested in
      if (err) throw err;
      const recipeID = res.rows[0].id;
      dealWithIngredients(object.ingredients, () => {
        object.ingredients.forEach((e) => {
          console.log(e);
          dbConnect.query(`INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (${recipeID}, (SELECT id FROM ingredients WHERE ingredients.name = '${e}'))`)
        })
      })
    });
  };
}
})
}

function dealWithIngredients(array, cb){
  let count = 1;
  array.forEach((element, i) => {
    dbConnect.query(`SELECT exists(SELECT name FROM ingredients WHERE ingredients.name = '${element}') FROM ingredients LIMIT 1;`, (err, res) => {
      if(!res.rows[0].exists){
        dbConnect.query(`INSERT INTO ingredients (name) VALUES ('${element}') RETURNING ID;`, (err, res) => {
          if(count === array.length){
            cb();
          }
          count+=1;
        });
      } else {
        if (count === array.length){
          cb();
        }
        count+=1;
      }
      })
  })
}



module.exports = {postData,
  renameRecipe,
};
