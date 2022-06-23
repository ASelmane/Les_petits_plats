export function addSearch(filter) {
    const recipes = document.querySelectorAll(".recipe_card");
    for (let i = 0; i < recipes.length; i++) {
        let ingr = 0;
        const title = recipes[i].querySelector(".recipe_title").textContent.toLowerCase();
        const description = recipes[i].querySelector(".recipe_description").textContent.toLowerCase();
        const ingredients = recipes[i].querySelectorAll(".recipe_ingredient");
        for (let j = 0; j < ingredients.length; j++) {
            const ingredient = ingredients[j].textContent.toLowerCase();
            if (ingredient.includes(filter)) {
                recipes[i].classList.remove("hidden");
                ingr = 1;
            }
        }
        if (title.includes(filter) || description.includes(filter) || ingr === 1 || filter.length < 3) {
            recipes[i].classList.remove("hidden");
        } else {
            recipes[i].classList.add("hidden");
        }
    }
    console.log(document.querySelectorAll(".recipe_card:not(.hidden)").length);
}

