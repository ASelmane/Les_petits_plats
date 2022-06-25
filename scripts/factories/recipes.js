export const recipeFactory = (data) => {
    const { name, appliance, description, ingredients, time, ustensils } = data;

    // Create the DOM elements for the recipe
    function getRecipeCardDOM() {
        const recipeSection = document.querySelector(".recipes");
        const article = document.createElement("article");
        article.setAttribute("class", "recipe_card");
        const divImg = document.createElement("div");
        divImg.setAttribute("class", "recipe_img");
        const divInfo = document.createElement("div");
        divInfo.setAttribute("class", "recipe_info");
        const divInfoHeader = document.createElement("div");
        divInfoHeader.setAttribute("class", "recipe_info_header");
        const title = document.createElement("h2");
        title.setAttribute("class", "recipe_title");
        title.textContent = name;
        const timer = document.createElement("span");
        timer.setAttribute("class", "recipe_time");
        timer.textContent = time + " min";
        const clock = document.createElement("img");
        clock.setAttribute("src", "../assets/icons/clock.svg");
        timer.prepend(clock);
        const divInfoContent = document.createElement("div");
        divInfoContent.setAttribute("class", "recipe_info_content");
        const ingredientsList = document.createElement("ul");
        ingredientsList.setAttribute("class", "recipe_ingredient_list");
        ingredients.forEach((ingredient) => {
            const li = document.createElement("li");
            const ingr = document.createElement("span");
            let unit = "";
            if(ingredient.unit) {
                unit = ingredient.unit;
                if(unit === "grammes") {
                    unit = "g";
                }
                unit = unit.split(" ")[0];
            }
            ingr.setAttribute("class", "recipe_ingredient");
            ingr.textContent = ingredient.ingredient + ((ingredient.quantity) ? ": " : "");
            const quantity = document.createElement("span");
            quantity.setAttribute("class", "recipe_quantity");
            quantity.textContent = ((ingredient.quantity) ? ingredient.quantity : "") + " " + unit;
            li.append(ingr, quantity);
            ingredientsList.appendChild(li);
        });
        const descript = document.createElement("p");
        descript.setAttribute("class", "recipe_description");
        descript.textContent = description;
        divInfo.setAttribute("data-ustensils", ustensils.toString().toLowerCase());
        divInfo.setAttribute("data-appliance", appliance.toLowerCase());
        divInfoHeader.append(title, timer);
        divInfoContent.append(ingredientsList, descript);
        divInfo.append(divInfoHeader, divInfoContent);
        article.append(divImg, divInfo);
        recipeSection.append(article);
    }

    return {getRecipeCardDOM};
};