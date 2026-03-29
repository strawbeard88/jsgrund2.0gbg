export let cart = [];

// Function to render the menu items on index.html
export async function renderMenu() {
  const menuData = await getMenu();
  if (!menuData || !menuData.items) {
    return;
  }

  const menuContainer = document.querySelector(".menu-container");
  menuContainer.innerHTML = "";

  const wontonWrapper = document.createElement("div");
  wontonWrapper.className = "wonton-wrapper";

  // Wonton section
  menuData.items
    .filter((item) => item.type === "wonton")
    .forEach((wonton) => {
      const ingredientsText = wonton.ingredients.join(", "); // Hämtar ingredienserna som en sträng

      const div = document.createElement("div");
      div.classList.add("wonton");
      div.dataset.id = wonton.id;
      div.dataset.type = "wonton";

      const nameP = document.createElement("p");
      nameP.classList.add("large-text");
      nameP.textContent = wonton.name.toUpperCase();

      const separatorP = document.createElement("div");
      separatorP.classList.add("dot-divider");

      const priceP = document.createElement("p");
      priceP.classList.add("large-text");
      priceP.textContent = `${wonton.price} SEK`;

      const ingredientsP = document.createElement("p");
      ingredientsP.classList.add("small-text");
      ingredientsP.textContent = ingredientsText;

      const nameContainer = document.createElement("div");
      nameContainer.classList.add("wonton-container");

      nameContainer.appendChild(nameP);
      nameContainer.appendChild(separatorP);
      nameContainer.appendChild(priceP);
      div.appendChild(nameContainer);
      div.appendChild(ingredientsP);

      wontonWrapper.appendChild(div);
    });

  menuContainer.appendChild(wontonWrapper);

  // Dip section
  const dipContainer = document.createElement("div");
  dipContainer.className = "condiment-container";
  const dipHeader = document.createElement("div");
  dipHeader.className = "condiment-header";
  const dipTitle = document.createElement("div");
  dipTitle.textContent = "DIPSÅS";
  const dipDivider = document.createElement("div");
  dipDivider.className = "dot-divider";
  const dipPrice = document.createElement("div");
  dipPrice.textContent = `${menuData.items.find((item) => item.type === "dip").price} SEK`;
  dipHeader.appendChild(dipTitle);
  dipHeader.appendChild(dipDivider);
  dipHeader.appendChild(dipPrice);
  const dipRows = document.createElement("div");
  dipRows.className = "condiment-rows";
  menuData.items
    .filter((item) => item.type === "dip")
    .forEach((dip) => {
      const condimentDiv = document.createElement("div");
      condimentDiv.className = "condiment";
      condimentDiv.textContent = dip.name;
      condimentDiv.dataset.id = dip.id;
      condimentDiv.dataset.type = "dip";
      dipRows.appendChild(condimentDiv);
    });
  dipContainer.appendChild(dipHeader);
  dipContainer.appendChild(dipRows);
  menuContainer.appendChild(dipContainer);

  // Drink section
  const drinkContainer = document.createElement("div");
  drinkContainer.className = "condiment-container";
  const drinkHeader = document.createElement("div");
  drinkHeader.className = "condiment-header";
  const drinkTitle = document.createElement("div");
  drinkTitle.textContent = "DRICKA";
  const drinkDivider = document.createElement("div");
  drinkDivider.className = "dot-divider";
  const drinkPrice = document.createElement("div");
  drinkPrice.textContent = `${menuData.items.find((item) => item.type === "drink").price} SEK`;
  drinkHeader.appendChild(drinkTitle);
  drinkHeader.appendChild(drinkDivider);
  drinkHeader.appendChild(drinkPrice);
  const drinkRows = document.createElement("div");
  drinkRows.className = "condiment-rows";
  menuData.items
    .filter((item) => item.type === "drink")
    .forEach((drink) => {
      const condimentDiv = document.createElement("div");
      condimentDiv.className = "condiment";
      condimentDiv.textContent = drink.name;
      condimentDiv.dataset.id = drink.id;
      condimentDiv.dataset.type = "drink";
      drinkRows.appendChild(condimentDiv);
    });
  drinkContainer.appendChild(drinkHeader);
  drinkContainer.appendChild(drinkRows);
  menuContainer.appendChild(drinkContainer);
}
