// For info on template strings, see this link: http://wesbos.com/template-strings-html

function createHtml(recipeArr) {
  let markup = '';
  recipeArr.map((recipe) => {
    markup += `
    <article class="recipe">
        <h3 class="recipe__title">${recipe.title}</h2>
        <div class="recipe__body">
            <p class="recipe__method">${recipe.body}</p>
            <h4 class="recipe__subtitle">Ingredients</h3>
              <ul class="recipe__ingredientList">
              ${recipe.ingredients.map(ingredient => `<li class="recipe__ingredient">${ingredient}</li>`).join('\n')}
            </ul>
            <footer class="recipe__footer">
                <p class="recipe__cuisine">Cuisine: ${recipe.cuis_name}</p>
            </footer>
        </div>
    </article>
    `;
  });
  console.log(markup);
  return markup;
}

const testarr = [{ title: 'Muffins', body: '1 cup self-raising flour\n3 tbsp sugar\n1 cup thickened cream\nPreheat oven to 180°C fan forced. Spray a 24 cup mini muffin tin with cooking spray and set aside.\nIn a bowl, mix the flour and sugar together.\nPour in the cream and fold mixture together using a spatula until all ingredients are just wet.\nSpoon into the muffin tin and bake for 10-15 minutes.\nLeave to cool in the tin for 2 minutes and then cool further on a wire rack.', cuis_name: 'American', ingredients: ['self-raising flour', 'caster sugar', 'thickened cream'] }, { title: 'Muffins', body: '1 cup self-raising flour\n3 tbsp sugar\n1 cup thickened cream\nPreheat oven to 180°C fan forced. Spray a 24 cup mini muffin tin with cooking spray and set aside.\nIn a bowl, mix the flour and sugar together.\nPour in the cream and fold mixture together using a spatula until all ingredients are just wet.\nSpoon into the muffin tin and bake for 10-15 minutes.\nLeave to cool in the tin for 2 minutes and then cool further on a wire rack.', cuis_name: 'American', ingredients: ['self-raising flour', 'caster sugar', 'thickened cream'] }];

createHtml(testarr);
