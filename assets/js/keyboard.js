import { showView, cart } from "./render.js";

let currentView = "menu-view";

// Event lyssnare för att se om man använder Ctrl+Y eller Ctrl+K
document.addEventListener("keydown", function (event) {
  // Ctrl+Y - Växla mellan menny och kundvagn
  if (event.ctrlKey && event.key === "y") {
    event.preventDefault();

    if (currentView === "menu-view") {
      currentView = "cart-view";
      showView("cart-view");
    } else {
      currentView = "menu-view";
      showView("menu-view");
    }
  }

  // Ctrl+K sökrutan
  if (event.ctrlKey && event.key === "k") {
    event.preventDefault();
    openSearchDialog();
  }
});
