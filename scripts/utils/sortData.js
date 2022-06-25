import { recipes } from "../data/recipe.js";
let recipFiltered = recipes;

export function addSearch(filter) {
    filter.toLowerCase();
    const recipeCard = document.querySelectorAll(".recipe_card");
    if(filter.length > 2) {
        recipFiltered = recipes.filter(recipeFilter);
    } else {
        recipFiltered = recipes;
    }
    recipeCard.forEach((rCard) => {
        if (recipFiltered.filter(rec => rec.name === rCard.querySelector(".recipe_title").textContent).length > 0) {
            rCard.classList.remove("hidden");
        } else {
            rCard.classList.add("hidden");
        }
    });

    function recipeFilter(recipe) {
        if (recipe.name.toLowerCase().includes(filter) || recipe.description.toLowerCase().includes(filter) || recipe.ingredients.filter((ingredient) => ingredient.ingredient.toLowerCase().includes(filter)).length > 0) {
            return true;
        }
    }
}

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

export function tagSearch(filter,type) {
    filter.toLowerCase();
    const tags = document.querySelectorAll(".dropdown." + type +" li");
    tags.forEach((tag) => {
        if (tag.textContent.toLowerCase().includes(filter) || filter.length < 3) {
            tag.classList.remove("hidden");
        } else {
            tag.classList.add("hidden");
        }
    });
}


// export function addSearch(filter) {
//     const recipes = document.querySelectorAll(".recipe_card");
//     recipes.forEach((recipe) => {
//         let ingr = 0;
//         const title = recipe.querySelector(".recipe_title").textContent.toLowerCase();
//         const description = recipe.querySelector(".recipe_description").textContent.toLowerCase();
//         const ingredients = recipe.querySelectorAll(".recipe_ingredient");
//         ingredients.forEach((ingredient) => {
//             const ingred = ingredient.textContent.toLowerCase();
//             if (ingred.includes(filter)) {
//                 ingr = 1;
//             }
//         });
//         if (title.includes(filter) || description.includes(filter) || ingr === 1 || filter.length < 3) {
//             recipe.classList.remove("hidden");
//         } else {
//             recipe.classList.add("hidden");
//         }
//     });
// }
