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
