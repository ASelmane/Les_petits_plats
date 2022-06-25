import { tagFilter } from "../utils/sortData.js";

export const tagFactory = (data) => {

    // Create the DOM elements for the tag in dropdowns
    function getTagListDOM() {
        data.forEach((items) => {
            const dropdown = document.querySelector(".dropdown." + items.type);
            const list = dropdown.querySelector(".dropdown_list");
            items.forEach((item) => {
                const tag = document.createElement("li");
                tag.textContent = item[0].toUpperCase() + item.slice(1);
                tag.addEventListener("click", () => {
                    getTagList(tag, items.type);
                    tag.classList.add("hidden");
                });
                list.append(tag);
            });
        });
    }

    return { getTagListDOM };
};

// Create the DOM elements for the selected tag in the tag list 
function getTagList(name,type) {
    const tagList = document.querySelector(".taglist");
    const dropdown = document.querySelector(".dropdown." + type);
    const tag = document.createElement("span");
    tag.setAttribute("class", "tag");
    const remove = document.createElement("img");
    remove.setAttribute("src", "assets/icons/remove.svg");
    remove.setAttribute("class", "tag_remove");
    if (dropdown.classList.contains("ingredients")) {
        tag.classList.add("ingredients");
    } else if (dropdown.classList.contains("appareils")) {
        tag.classList.add("appareils");
    } else {
        tag.classList.add("ustensiles");
    }
    tag.textContent = name.textContent;
    tag.append(remove);
    tag.querySelector(".tag_remove").addEventListener("click", () => {
        tag.remove();
        name.classList.remove("hidden");
        tagFilter();
    });
    tagList.append(tag);
    tagFilter();
}
