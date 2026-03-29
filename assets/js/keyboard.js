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

// sökrutan funktion
function openSearchDialog() {
  let dialog = document.querySelector(".search-dialog");

  if (!dialog) {
    dialog = document.createElement("div");
    dialog.className = "search-dialog";

    const dialogContent = document.createElement("div");
    dialogContent.className = "search-dialog-content";

    const title = document.createElement("h2");
    title.textContent = "Sök ingredienser";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "search-input";
    input.placeholder = "Skriv ett sökord...";

    const results = document.createElement("div");
    results.className = "search-results";

    const closeButton = document.createElement("button");
    closeButton.textContent = "Stäng";
    closeButton.className = "search-close-btn";

    dialogContent.appendChild(title);
    dialogContent.appendChild(input);
    dialogContent.appendChild(results);
    dialogContent.appendChild(closeButton);
    dialog.appendChild(dialogContent);
    document.body.appendChild(dialog);

    closeButton.addEventListener("click", function () {
      dialog.style.display = "none";
    });

    // lägg till så att du kan klicka utanför för att stänga
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        dialog.style.display = "none";
      }
    });

    // Sök när man skriver
    input.addEventListener("input", function () {
      searchIngredients(input.value, results);
    });

    // Stäng med Escape-tangenten
    input.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        dialog.style.display = "none";
      }
    });
  }

  // Visa dialogen
  dialog.style.display = "flex";
  const input = dialog.querySelector(".search-input");
  input.value = "";
  input.focus();

  // Rensa tidigare resultat
  const results = dialog.querySelector(".search-results");
  results.innerHTML = "";
}
