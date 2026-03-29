// Ladda in alla moduler
import "./apinit.js";
import { renderMenu, showView } from "./render.js";
import { setupEventListeners } from "./btn.js";
import { setupTabNavigation } from "./keyboard.js";

// Starta appen
(async () => {
  await renderMenu();
  setupEventListeners();
  setupTabNavigation();
  showView("menu-view");
})();
