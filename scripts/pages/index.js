import { recipes } from "../data/recipe.js";
import { recipeFactory } from "../factories/recipes.js";
import { tagFactory } from "../factories/tag.js";
import { addSearch, tagSearch } from "../utils/sortData.js";

const searchBar = document.getElementById("search");
const dropdowns = document.querySelectorAll(".dropdown");

searchBar.addEventListener("keyup", (e) => {
    const search = e.target.value.toLowerCase();
    addSearch(search);
});

dropdowns.forEach((dropdown) => {
    const type = dropdown.classList[2];
    const tagInput = dropdown.querySelector(".dropdown_search_input");
    tagInput.addEventListener("keyup", (e) => {
        const search = e.target.value.toLowerCase();
        tagSearch(search, type);
    });
});

// Get recipes information for tags dropdowns
function getRecipesTag() {
    let tag = [];
    let appareils = [];
    let ustensiles = [];
    let ingredients = [];
    let i = 0;
    let j = 0;
    recipes.forEach((recipe, index) => {
        appareils[index] = recipe.appliance.toLowerCase();
        recipe.ustensils.forEach((ustensil) => {
            ustensiles[i] = ustensil.toLowerCase();
            i++;
        });
        recipe.ingredients.forEach((ingredient) => {
            ingredients[j] = ingredient.ingredient.toLowerCase();
            j++;    
        });
    });
    tag.push(new Set(appareils),new Set(ustensiles),new Set(ingredients));
    tag[0]["type"] = "appareils";
    tag[1]["type"] = "ustensiles";
    tag[2]["type"] = "ingredients";
    return tag ;
}

function displayData(recipes) {
    // create the DOM elements for each recipes
    recipes.forEach((recipe) => {
        recipeFactory(recipe).getRecipeCardDOM();
    });
}

function init() {
    const tag = getRecipesTag();
    displayData(recipes);
    tagFactory(tag).getTagListDOM();
}

init();
