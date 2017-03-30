# Learnings

## Setting up a database

(taken from [Morning Challenge](https://github.com/shiryz/db-morning-challenge)):
- In your browser, go to ElephantSQL
- Log into ElephantSQL via GitHub
- Click on 'Create new instance' to create a new database
- Give your database a name, choose the 'Tiny Turtly' free plan, and select any data center from the list
- Click on the name of your new new database to see details; you'll need the URL. Copy this to your clipboard!
- Back in your command line, create a config.env file with the url of your new database. You can do that like this  `$ echo "export DB_URL = {YOUR_COPIED_URL}" >> "config.env"`
- Build your database by running: `$ node database/db_build.js`
- It is now on elephant!

## Setting up server

[We followed Dan's guide](https://github.com/sofer/sssk/blob/master/router.js)

## Outputting data from database

```sql
SELECT recipes_org.title, recipes_org.body, cuisine.name AS cuis_name, array(SELECT ingredients.name FROM ingredients INNER JOIN recipe_ingredients ON ingredients.id = recipe_ingredients.ingredient_id INNER JOIN recipes ON recipes.id = recipe_ingredients.recipe_id WHERE (SELECT recipes.id FROM recipes WHERE recipes_org.title = title) = recipes.id) AS ingredients FROM recipes AS recipes_org INNER JOIN cuisine ON recipes_org.cuisine_id = cuisine.id
```

We needed to create one table where each row had the title of the recipe, body of the recipe, the name of the cuisine and all of the ingredients relating to the recipe as an array.

We give the `recipes` table an alias so we can refer to it uniquely (`recipes_org`).

We link the `recipes_org` table directly to the cuisine table in order to get the name of the cuisine from the cuisine id.

Inside of the select, we have to do a subquery where we select the names from the ingredients table, join it to the recipe ingredients linking table which we then link to the recipe table and we then use `WHERE` with another subquery to select the id of the recipe from the recipes table where the title of the recipe is the same as the title of the recipe in the row we are creating in `recipes_org`.

We then compare that id to the recipes id within our subquery, which gives us a table of just the ingredients relevant to the recipe relative to the row we're creating in `recipes_org` and we use the array aggregate function to turn that single column table into an array which we then put into the row we are creating in `recipes_org` table.

## A **huge** struggle :cry::cry::cry:

We struggled getting the following logic to work:

- if recipe name exists, add a star to the end ----> do recursion until recipe name is unique
- if cuisine name doesn't exist ----> create it
- get id of cuisine name
- put name, cuisine_id and body into recipe
- for each ingredient, if it doesn't exist, create it
- find id for each ingredient
- add each ingredient id with the recipe id to the recipe_ingredients table
