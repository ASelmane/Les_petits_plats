import { recipes } from "../data/recipe.js";
import { recipeFactory } from "../factories/recipes.js";
import { tagFactory } from "../factories/tag.js";
import { addSearch, getRecipesTag, tagSearch } from "../utils/sortData.js";

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
