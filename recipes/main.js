import { recipes } from './recipes.mjs';

const recipesContainer = document.querySelector('.recipes');

recipes.forEach(recipe => {
  const article = document.createElement('article');
  article.classList.add('recipe');

  article.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.title}" />
    <h2>${recipe.title}</h2>
    <span class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">
      ${[...Array(recipe.rating)].map(() => '<span aria-hidden="true" class="icon-star">⭐</span>').join('')}
      ${[...Array(5 - recipe.rating)].map(() => '<span aria-hidden="true" class="icon-star-empty">☆</span>').join('')}
    </span>
    <p class="description">${recipe.description}</p>
  `;
  recipesContainer.appendChild(article);
});
