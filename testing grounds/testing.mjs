export let recipes = [];

export function addRecipe(recipe) {
  if (recipe && recipe.title && recipe.instructions && recipe.image) {
    recipes.push(recipe);
  }
}
