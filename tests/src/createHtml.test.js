const test = require('tape');
const createHtml = require('../../src/createHtml.js');


test('Test createHtml with correct data', (t) => {
  const dataArr = [{
    title: 'Muffins',
    body: '1 cup self-raising flour\n3 tbsp sugar\n1 cup thickened cream\nPreheat oven to 180°C fan forced. Spray a 24 cup mini muffin tin with cooking spray and set aside.\nIn a bowl, mix the flour and sugar together.\nPour in the cream and fold mixture together using a spatula until all ingredients are just wet.\nSpoon into the muffin tin and bake for 10-15 minutes.\nLeave to cool in the tin for 2 minutes and then cool further on a wire rack.',
    cuis_name: 'American',
    ingredients: ['self-raising flour', 'caster sugar', 'thickened cream'],
  }];
  const expected = `
  <article class="recipe">
          <h3 class="recipe__title">Muffins</h2>
              <p class="recipe__method">1 cup self-raising flour\n3 tbsp sugar\n1 cup thickened cream\nPreheat oven to 180°C fan forced. Spray a 24 cup mini muffin tin with cooking spray and set aside.\nIn a bowl, mix the flour and sugar together.\nPour in the cream and fold mixture together using a spatula until all ingredients are just wet.\nSpoon into the muffin tin and bake for 10-15 minutes.\nLeave to cool in the tin for 2 minutes and then cool further on a wire rack.</p>
              <h4 class="recipe__subtitle">Ingredients</h3>
                <ul class="recipe__ingredientList">
                <li class="recipe__ingredient">self-raising flour</li>
                <li class="recipe__ingredient">caster sugar</li>
                <li class="recipe__ingredient">thickened cream</li>
              </ul>
              <footer class="recipe__footer">
                  <p class="recipe__cuisine">Cuisine: American</p>
              </footer>
      </article>`;
  const actual = createHtml(null, dataArr);
  t.equal(actual.replace(/\s/g, ''), expected.replace(/\s/g, ''), 'should return the correct html');
  t.end();
});

test('Test createHtml with an error', (t) => {
  const expected = 'Sorry, we\'re having trouble finding recipes right now';
  const actual = createHtml('Error lol');
  t.equal(actual, expected, 'Should return an error');
  t.end();
});
