const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#primary-menu");
const mobileMenu = window.matchMedia("(max-width: 720px)");
const currentYear = document.querySelector("#current-year");

function syncNavigation() {
    const isMobile = mobileMenu.matches;
    menuButton.hidden = !isMobile;

    if (!isMobile) {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menú");
        menu.hidden = false;
        return;
    }

    menu.hidden = menuButton.getAttribute("aria-expanded") !== "true";
}

menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    menuButton.setAttribute("aria-label", isExpanded ? "Abrir menú" : "Cerrar menú");
    menu.hidden = isExpanded;
});

menu.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a") && mobileMenu.matches) {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menú");
        menu.hidden = true;
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.matches && menuButton.getAttribute("aria-expanded") === "true") {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menú");
        menu.hidden = true;
        menuButton.focus();
    }
});

mobileMenu.addEventListener("change", syncNavigation);
syncNavigation();
currentYear.textContent = new Date().getFullYear();
