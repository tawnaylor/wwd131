// Import the recipe data
import recipes from './recipes.mjs';

// Utility: Get random integer
function random(num) {
  return Math.floor(Math.random() * num);
}

// Utility: Get random item from an array
function getRandomListEntry(list) {
  return list[random(list.length)];
}

// Template: Generate HTML for recipe tags
function tagsTemplate(tags) {
  return tags.map(tag => `<li>${tag}</li>`).join('');
}

// Template: Generate HTML for recipe star rating
function ratingTemplate(rating) {
  let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
    } else {
      html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    }
  }

  html += `</span>`;
  return html;
}

// Template: Generate full HTML for a recipe card
function recipeTemplate(recipe) {
  return `<figure class="recipe">
    <img src="${recipe.image}" alt="image of ${recipe.name}" />
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

// Render recipe list to the page
function renderRecipes(recipeList) {
  const container = document.querySelector("#recipes");
  if (container) {
    container.innerHTML = recipeList.map(recipeTemplate).join('');
  }
}

// Start the page with a random recipe
function init() {
  if (recipes && recipes.length) {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
  }
}

function filter(query) {
  const filtered = recipes.filter(filterFunction);
  // sort by name
  const sorted = filtered.sort(sortFunction);
  return sorted;
}

function searchHandler(e) {
  e.preventDefault();
  // get the search input
  const input = document.getElementById("search-input");
  if (!input) return;
  // convert the value in the input to lowercase
  const query = input.value.toLowerCase();
  // use the filter function to filter our recipes
  const filtered = filter(query);
  // render the filtered list
  renderRecipes(filtered);
}

// Run the init function
init();
