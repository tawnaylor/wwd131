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

  const title = document.getElementById('title').value;
  const instructions = document.getElementById('instructions').value;
  const imageFile = document.getElementById('image').files[0];

  const reader = new FileReader();
  reader.onload = function () {
    const imageUrl = reader.result;
    const recipe = { title, instructions, image: imageUrl };
    addRecipe(recipe);
    displayRecipes();
    form.reset();
  };

  if (imageFile) {
    reader.readAsDataURL(imageFile);
  }
});

function displayRecipes() {
  list.innerHTML = '';
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
  popup.classList.remove('hidden');
}

closeBtn.addEventListener('click', () => {
  popup.classList.add('hidden');
});
