import { recipes, addRecipe } from './recipes.mjs';

const form = document.getElementById('recipeForm');
const list = document.getElementById('recipeList');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('closePopup');
const popupTitle = document.getElementById('popupTitle');
const popupImage = document.getElementById('popupImage');
const popupInstructions = document.getElementById('popupInstructions');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const instructions = document.getElementById('instructions').value.trim();
  const imageFile = document.getElementById('image').files[0];

  if (!title || !instructions || !imageFile) return;

  const reader = new FileReader();
  reader.onload = function () {
    const imageUrl = reader.result;
    const recipe = { title, instructions, image: imageUrl };
    addRecipe(recipe);
    displayRecipes();
    form.reset();
  };

  reader.readAsDataURL(imageFile);
});

function displayRecipes() {
  list.innerHTML = ''; // clear old list

  recipes.forEach((recipe, index) => {
    const li = document.createElement('li');
    li.textContent = recipe.title;
    li.addEventListener('click', () => openPopup(index));
    list.appendChild(li);
  });
}

function openPopup(index) {
  const recipe = recipes[index];
  popupTitle.textContent = recipe.title;
  popupInstructions.textContent = recipe.instructions;
  popupImage.src = recipe.image;
  popupImage.alt = recipe.title;
  popup.classList.remove('hidden');
  closeBtn.focus();
}

closeBtn.addEventListener('click', () => {
  popup.classList.add('hidden');
});

// Initialize the recipe list on page load
displayRecipes();
// Initialize the recipe list on page load
displayRecipes();
  // Return focus to the recipe list for accessibility
  list.querySelector('li[tabindex="0"]')?.focus();
;

// Initialize the recipe list on page load
displayRecipes();
