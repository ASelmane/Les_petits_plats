import { recipes } from "../data/recipe.js";
import { tagFactory } from "../factories/tag.js";

const searchBar = document.getElementById("search");
let recipFiltered = recipes;

export function addSearch(filter = searchBar.value.toLowerCase()) {
    filter.toLowerCase();
    const recipeCard = document.querySelectorAll(".recipe_card");
    const tags = document.querySelectorAll(".taglist span");
    if (filter === "" && tags.length === 0) {
        recipFiltered = recipes;
    } else {
        recipFiltered = recipes.filter(recipeFilter);
    }

    recipeCard.forEach((rCard) => {
        if (recipFiltered.filter((rec) => rec.name === rCard.querySelector(".recipe_title").textContent).length > 0) {
            rCard.classList.remove("hidden");
        } else {
            rCard.classList.add("hidden");
        }
    });

    if(document.querySelectorAll(".recipe_card:not(.hidden)").length === 0) {
        if(!document.querySelector(".no_recipe")) {
            const div = document.createElement("div");
            div.setAttribute("class", "no_recipe");
            const h3 = document.createElement("h3");
            h3.textContent = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";
            div.append(h3);
            document.querySelector(".recipes").append(div);
        }
    }
    else {
        if (document.querySelector(".no_recipe")) {
            document.querySelector(".no_recipe").remove();
        }
    }

    function recipeFilter(recipe) {
        let flag = false;
        let tagFlag = true;
        if (recipe.name.toLowerCase().includes(filter) || recipe.description.toLowerCase().includes(filter) || recipe.ingredients.filter((ingredient) => ingredient.ingredient.toLowerCase().includes(filter)).length > 0) {
            if (filter.length > 2) {
                flag = true;
            }
        }
        tags.forEach((tag) => {
            switch (tag.classList[1]) {
                case "appareils": {
                    if (!(recipe.appliance.toLowerCase() === (tag.textContent.toLowerCase()))) {
                        tagFlag = false;
                    }
                    break;
                }
                case "ustensiles": {
                    if (!recipe.ustensils.map((ustensil) => ustensil.toLowerCase()).includes(tag.textContent.toLowerCase())) {
                        tagFlag = false;
                    }
                    break;
                }
                case "ingredients": {
                    if (!recipe.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase()).includes(tag.textContent.toLowerCase())) {
                        tagFlag = false;
                    }
                    break;
                }
            }
        });
        if ((filter.length < 3 || flag === true) && tagFlag === true) {
            return true;
        }
    }

    const tagd = getRecipesTag();
    document.querySelectorAll(".dropdown_list").forEach((dropdown) => {
        dropdown.innerHTML = "";
    });
    tagFactory(tagd).getTagListDOM();
}

export function tagSearch(filter, type) {
    filter.toLowerCase();
    const tags = document.querySelectorAll(".dropdown." + type + " li");
    let tagSelected = [];
    document.querySelectorAll(".taglist span").forEach((tag) => {
        tagSelected.push(tag.textContent.toLowerCase());
    });
    tags.forEach((tag) => {
        if (tag.textContent.toLowerCase().includes(filter) || filter.length < 3) {
            if (!tagSelected.includes(tag.textContent.toLowerCase())) {
                tag.classList.remove("hidden");
            }
            else {
                tag.classList.add("hidden");
            }
        } else {
            tag.classList.add("hidden");
        }
        
    });
}

// Get recipes information for tags dropdowns
export function getRecipesTag() {
    let tag = [];
    let appareils = [];
    let ustensiles = [];
    let ingredients = [];
    let i = 0;
    let j = 0;
    let tagSelected = [];
    document.querySelectorAll(".taglist span").forEach((tag) => {
        tagSelected.push(tag.textContent.toLowerCase());
    });
    recipFiltered.forEach((recipe, index) => {
        if (!tagSelected.includes(recipe.appliance.toLowerCase())) {
            appareils[index] = recipe.appliance.toLowerCase();
        }
        recipe.ustensils.forEach((ustensil) => {
            if (!tagSelected.includes(ustensil.toLowerCase())) {
                ustensiles[i] = ustensil.toLowerCase();
                i++;
            }
        });
        recipe.ingredients.forEach((ingredient) => {
            if (!tagSelected.includes(ingredient.ingredient.toLowerCase())) {
                ingredients[j] = ingredient.ingredient.toLowerCase();
                j++;    
            }
        });
    });
    tag.push(new Set(appareils),new Set(ustensiles),new Set(ingredients));
    tag[0]["type"] = "appareils";
    tag[1]["type"] = "ustensiles";
    tag[2]["type"] = "ingredients";
    return tag ;
}
