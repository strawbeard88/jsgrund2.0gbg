import { addToCart, showView } from "./render.js";

export function setupEventListeners() {
  document.addEventListener("click", (e) => {
    if (e.target.closest(".wonton")) {
      const wontonDiv = e.target.closest(".wonton");
      const id = wontonDiv.dataset.id;
      const name = wontonDiv.querySelector(".large-text").textContent;
      const priceText =
        wontonDiv.querySelectorAll(".large-text")[1].textContent;
      const price = parseInt(priceText.replace(" SEK", ""));
      addToCart("wonton", id, name, price);
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("condiment")) {
      const condiment = e.target;
      const type = condiment.dataset.type;
      const id = condiment.dataset.id;
      const name = condiment.textContent;
      const header = condiment
        .closest(".condiment-container")
        .querySelector(".condiment-header div:last-child");
      const price = parseInt(header.textContent.replace(" SEK", ""));
      addToCart(type, id, name, price);
    }
  });

  document.querySelector(".menu-btn").addEventListener("click", () => {
    showView("cart-view");
  });
}
