export function tagFilter() {
    let recipes = document.querySelectorAll(".recipe_card");
    const tags = document.querySelectorAll(".taglist span");
    recipes.forEach((recipe) => {
        let flag = false;
        tags.forEach((tag) => {
            tag.textContent.toLowerCase();
            let inc = [];
            const ingredients = recipe.querySelectorAll(".recipe_ingredient");
            ingredients.forEach((ingredient) => {
                inc.push(ingredient.textContent.toLowerCase().replace(": ", ""));
            });
            switch (tag.classList[1]) {
                case "appareils": {
                    if (tag.textContent.toLowerCase() === recipe.querySelector(".recipe_info").dataset.appliance && !flag) {
                        flag = false;
                        recipe.classList.remove("hidden");
                    } else {
                        recipe.classList.add("hidden");
                        flag = true;
                    }
                    break;
                }
                case "ustensiles": {
                    const ustensils = recipe.querySelector(".recipe_info").dataset.ustensils.split(",");
                    if (ustensils.includes(tag.textContent.toLowerCase()) && !flag) {
                        flag = false;
                        recipe.classList.remove("hidden");
                    } else {
                        recipe.classList.add("hidden");
                        flag = true;
                    }
                    break;
                }
                case "ingredients": {
                    if (inc.includes(tag.textContent.toLowerCase()) && !flag) {
                        flag = false;
                        recipe.classList.remove("hidden");
                    } else {
                        recipe.classList.add("hidden");
                        flag = true;
                    }
                    break;
                }
            }
        });
        if (tags.length === 0) {
            recipe.classList.remove("hidden");
        }
    });
}
