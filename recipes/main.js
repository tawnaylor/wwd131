import recipes from './recipes.mjs';

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
  return list[random(list.length)];
}

function tagsTemplate(tags) {
  return tags.map(tag => `<li>${tag}</li>`).join('');
}

function ratingTemplate(rating) {
  let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
  for (let i = 1; i <= 5; i++) {
    html += i <= rating
      ? `<span aria-hidden="true" class="icon-star">⭐</span>`
      : `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
  }
  html += `</span>`;
  return html;
}

function recipeTemplate(recipe) {
  return `
<figure class="recipe">
  <img src="${recipe.image}" alt="Image of ${recipe.name}" />
  <figcaption>
    <ul class="recipe__tags">
      ${tagsTemplate(recipe.tags)}
    </ul>
    <h2><a href="#">${recipe.name}</a></h2>
    <p class="recipe__ratings">
      ${ratingTemplate(recipe.rating)}
    </p>
    <p class="recipe__description">
      ${recipe.description}
    </p>
  </figcaption>
</figure>`;
}

function renderRecipes(recipeList) {
  const container = document.querySelector("#recipes");
  container.innerHTML = recipeList.map(recipeTemplate).join('');
}

function init() {
  const recipe = getRandomListEntry(recipes);
  renderRecipes([recipe]);
}

function filterRecipes(query) {
  return recipes.filter(recipe => {
    const inName = recipe.name.toLowerCase().includes(query);
    const inDesc = recipe.description.toLowerCase().includes(query);
    const inTags = recipe.tags.find(tag => tag.toLowerCase().includes(query));
    const inIngredients = recipe.ingredients.find(ing => ing.toLowerCase().includes(query));
    return inName || inDesc || inTags || inIngredients;
  }).sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(event) {
  event.preventDefault();
  const query = document.getElementById("search-input").value.toLowerCase();
  const results = filterRecipes(query);
  renderRecipes(results);
}

document.getElementById("search-form").addEventListener("submit", searchHandler);

init();
