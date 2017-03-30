BEGIN;

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(60) NOT NULL,
  body VARCHAR(700) NOT NULL,
  cuisine_id INTEGER REFERENCES cuisine(id)
)

CREATE TABLE recipe_ingredients (
  recipe_id INTEGER REFERENCES recipes(id),
  ingredient_id INTEGER REFERENCES ingredients(id)
)

CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(30) NOT NULL
)

CREATE TABLE cuisine (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(30) NOT NULL
)

INSERT INTO recipes (title, body, cuisine_id) VALUES
('Pineapple cake', '2 cups self-raising flour, sifted
1 cup caster sugar
1 can (440g) crushed pineapple in syrup or juice, undrained
Preheat oven to 180°C. Line a loaf tin with baking paper and set aside.
Mix all ingredients together until well combined.
Pour into the loaf tin and bake for 55-60 minutes.', 1);

INSERT INTO ingredients (name) VALUES
('self-raising flour'),
('tinned pineapple'),
('caster sugar');

INSERT INTO cuisine (name) VALUES
('Baking');

COMMIT;
