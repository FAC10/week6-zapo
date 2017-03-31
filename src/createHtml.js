// For info on template strings, see this link: http://wesbos.com/template-strings-html

function createHtml(err, recipeArr) {
  let markup = '';
  if (err) {
    markup += 'Sorry, we\'re having trouble finding recipes right now';
    return markup;
  }
  recipeArr.map((recipe) => {
    markup += `
    <article class="recipe">
      <h3 class="recipe__title">${recipe.title}</h2>
        <p class="recipe__method">${recipe.body}</p>
        <h4 class="recipe__subtitle">Ingredients</h3>
        <ul class="recipe__ingredientList">
        ${recipe.ingredients.map(ingredient => `<li class="recipe__ingredient">${ingredient}</li>`).join('\n')}
        </ul>
        <footer class="recipe__footer">
            <p class="recipe__cuisine">Cuisine: ${recipe.cuis_name}</p>
        </footer>
    </article>
    `;
  });
  return markup;
}

module.exports = createHtml;
