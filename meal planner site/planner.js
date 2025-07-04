import { recipes } from './recipes.js';

const dayContainer = document.getElementById('days');
const groceryList = {};
const nutritionTotals = { calories: 0, carbs: 0 };
const plannerState = {};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

days.forEach(day => {
  plannerState[day] = [];
  const div = document.createElement('div');
  div.className = 'day';
  div.dataset.day = day;
  div.innerHTML = `<h4>${day}</h4>`;

  div.addEventListener('dragover', e => e.preventDefault());
  div.addEventListener('drop', e => {
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const item = document.createElement('div');
    item.className = 'meal';
    item.textContent = data.name;
    div.appendChild(item);

    plannerState[day].push(data);
    updateState(data);
  });

  dayContainer.appendChild(div);
});

function renderRecipes() {
  const container = document.getElementById('recipes');
  recipes.forEach(recipe => {
    const div = document.createElement('div');
    div.className = 'meal';
    div.draggable = true;
    div.textContent = recipe.name;
    div.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', JSON.stringify(recipe));
    });
    container.appendChild(div);
  });
}

function updateGroceryList() {
  const ul = document.getElementById('groceries');
  ul.innerHTML = '';
  for (const item in groceryList) {
    const li = document.createElement('li');
    li.textContent = `${item}: ${groceryList[item]}`;
    ul.appendChild(li);
  }
}

function updateNutrition() {
  document.getElementById('calories-bar').style.width = Math.min(100, nutritionTotals.calories / 25) + '%';
  document.getElementById('carbs-bar').style.width = Math.min(100, nutritionTotals.carbs / 5) + '%';
}

function updateState(data) {
  for (const ing in data.ingredients) {
    groceryList[ing] = (groceryList[ing] || 0) + data.ingredients[ing];
  }
  nutritionTotals.calories += data.calories;
  nutritionTotals.carbs += data.carbs;
  updateGroceryList();
  updateNutrition();
}

function saveToLocalStorage() {
  localStorage.setItem('mealPlanner', JSON.stringify({
    plannerState,
    groceryList,
    nutritionTotals
  }));
}

function loadFromLocalStorage() {
  const saved = JSON.parse(localStorage.getItem('mealPlanner'));
  if (!saved) return;

  Object.assign(plannerState, saved.plannerState);
  Object.assign(groceryList, saved.groceryList);
  Object.assign(nutritionTotals, saved.nutritionTotals);

  for (const day in plannerState) {
    const dayBox = document.querySelector(`.day[data-day='${day}']`);
    plannerState[day].forEach(meal => {
      const div = document.createElement('div');
      div.className = 'meal';
      div.textContent = meal.name;
      dayBox.appendChild(div);
      updateState(meal);
    });
  }

  updateGroceryList();
  updateNutrition();
}

document.getElementById('reset').addEventListener('click', () => {
  days.forEach(day => {
    plannerState[day] = [];
    const box = document.querySelector(`.day[data-day='${day}']`);
    box.innerHTML = `<h4>${day}</h4>`;
  });

  Object.keys(groceryList).forEach(key => delete groceryList[key]);
  nutritionTotals.calories = 0;
  nutritionTotals.carbs = 0;
  updateGroceryList();
  updateNutrition();
  localStorage.removeItem('mealPlanner');
});

document.getElementById('save').addEventListener('click', () => {
  saveToLocalStorage();
  alert('Meal plan saved!');
});

renderRecipes();
loadFromLocalStorage();
