export function addSearch(filter) {
    const recipes = document.querySelectorAll(".recipe_card");
    recipes.forEach((recipe) => {
        let ingr = 0;
        const title = recipe.querySelector(".recipe_title").textContent.toLowerCase();
        const description = recipe.querySelector(".recipe_description").textContent.toLowerCase();
        const ingredients = recipe.querySelectorAll(".recipe_ingredient");
        ingredients.forEach((ingredient) => {
            const ingred = ingredient.textContent.toLowerCase();
            if (ingred.includes(filter)) {
                ingr = 1;
            }
        });
        if (title.includes(filter) || description.includes(filter) || ingr === 1 || filter.length < 3) {
            recipe.classList.remove("hidden");
        } else {
            recipe.classList.add("hidden");
        }
    });
}