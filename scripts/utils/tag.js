const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
    dropdown.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", () => {
            if (!dropdown.classList.contains("active")) {
                if(document.querySelector(".active")) {
                    document.querySelector(".active").classList.remove("active");
                }
                dropdown.classList.add("active");
                dropdown.querySelector("input").focus();
                document.addEventListener("keydown", (e) => {
                    if (e.key === "Escape") {
                        dropdown.classList.remove("active");
                    }
                });
            }
            else {
                dropdown.classList.remove("active");
            }
        });
    });
});

