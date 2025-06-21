import { recipes } from './recipes.mjs';

const recipesContainer = document.querySelector('.recipes');

recipes.forEach(recipe => {
  const article = document.createElement('article');
  article.classList.add('recipe');

  article.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.title}" />
    <div class="recipe-content">
      <span class="tag">${recipe.category}</span>
      <h2 class="title">${recipe.title}</h2>
      <span class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">
        ${'⭐'.repeat(recipe.rating)}${'☆'.repeat(5 - recipe.rating)}
      </span>
      <p class="description">${recipe.description}</p>
    </div>
  `;

  recipesContainer.appendChild(article);
});
