const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const dayContainer = document.getElementById('days');
const groceryList = {};
const nutritionTotals = { calories: 0, carbs: 0 };

days.forEach(day => {
  const div = document.createElement('div');
  div.className = 'day';
  div.dataset.day = day;
  div.innerHTML = `<h4>${day}</h4>`;

  div.addEventListener('dragover', e => e.preventDefault());
  div.addEventListener('drop', e => {
    e.preventDefault();
    let data;
    try {
      data = JSON.parse(e.dataTransfer.getData('text/plain'));
    } catch {
      return;
    }
    if (!data || !data.name) return;
    const item = document.createElement('div');
    item.className = 'meal';
    item.textContent = data.name;
    div.appendChild(item);

    // Update grocery list
    for (const ing in data.ingredients) {
      groceryList[ing] = (groceryList[ing] || 0) + data.ingredients[ing];
    }
    updateGroceryList();

    // Update nutrition
    nutritionTotals.calories += data.calories;
    nutritionTotals.carbs += data.carbs;
    updateNutrition();
  });

  dayContainer.appendChild(div);
});

// Only add dragstart to meals in #recipe-list, not dropped meals in planner
document.querySelectorAll('#recipe-list .meal').forEach(meal => {
  meal.addEventListener('dragstart', e => {
    const data = {
      name: meal.dataset.name,
      ingredients: JSON.parse(meal.dataset.ingredients),
      calories: parseInt(meal.dataset.calories),
      carbs: parseInt(meal.dataset.carbs),
    };
    e.dataTransfer.setData('text/plain', JSON.stringify(data));
  });
});

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
