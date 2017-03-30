BEGIN;

CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE cuisine (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(60) NOT NULL,
  body VARCHAR(700) NOT NULL,
  cuisine_id INTEGER REFERENCES cuisine(id)
);

CREATE TABLE recipe_ingredients (
  recipe_id INTEGER REFERENCES recipes(id),
  ingredient_id INTEGER REFERENCES ingredients(id)
);

INSERT INTO cuisine (name) VALUES
('British'),
('American');

INSERT INTO ingredients (name) VALUES
('self-raising flour'),
('tinned pineapple'),
('caster sugar'),
('thickened cream');

INSERT INTO recipes (title, body, cuisine_id) VALUES
('Pineapple cake', '2 cups self-raising flour, sifted
1 cup caster sugar
1 can (440g) crushed pineapple in syrup or juice, undrained
Preheat oven to 180°C. Line a loaf tin with baking paper and set aside.
Mix all ingredients together until well combined.
Pour into the loaf tin and bake for 55-60 minutes.', 1),
('Muffins', '1 cup self-raising flour
3 tbsp sugar
1 cup thickened cream
Preheat oven to 180°C fan forced. Spray a 24 cup mini muffin tin with cooking spray and set aside.
In a bowl, mix the flour and sugar together.
Pour in the cream and fold mixture together using a spatula until all ingredients are just wet.
Spoon into the muffin tin and bake for 10-15 minutes.
Leave to cool in the tin for 2 minutes and then cool further on a wire rack.', 2);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 3),
(2, 4);

COMMIT;
