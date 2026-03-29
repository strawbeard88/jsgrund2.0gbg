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

export function addToCart(type, id, name, price) {
  const existing = cart.find((item) => item.id === id && item.type === type);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ type, id, name, price, quantity: 1 });
  }
  updateCartBadge();
}

export function updateCartBadge() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.querySelector(".cart-badge");
  if (badge) {
    badge.textContent = totalItems;
  }
}

// Varukorg renderas i cart-view
export function renderCart() {
  const cartView = document.querySelector(".cart-view");
  cartView.innerHTML = "";

  const header = document.createElement("div");
  header.className = "cart-header";
  const cartIcon = document.createElement("img");
  cartIcon.src = "assets/images/cart.png";
  cartIcon.alt = "Varukorg";
  header.appendChild(cartIcon);
  cartView.appendChild(header);

  if (cart.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "Varukorgen är tom";
    cartView.appendChild(emptyMsg);

    const backBtn = document.createElement("button");
    backBtn.className = "cart-checkout-btn";
    backBtn.textContent = "TILLBAKA TILL MENYN";
    backBtn.addEventListener("click", () => showView("menu-view"));
    cartView.appendChild(backBtn);
    return;
  }

  const itemsContainer = document.createElement("div");
  itemsContainer.className = "cart-items";

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";

    const itemRow = document.createElement("div");
    itemRow.className = "cart-item-row";

    const nameSpan = document.createElement("span");
    nameSpan.className = "cart-item-name";
    nameSpan.textContent = item.name;

    const dots = document.createElement("span");
    dots.className = "cart-item-dots";

    const priceSpan = document.createElement("span");
    priceSpan.className = "cart-item-price";
    priceSpan.textContent = `${item.price} SEK`;

    itemRow.appendChild(nameSpan);
    itemRow.appendChild(dots);
    itemRow.appendChild(priceSpan);

    // + och - knapper
    const controls = document.createElement("div");
    controls.className = "cart-item-controls";

    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.addEventListener("click", () => {
      item.quantity += 1;
      updateCartBadge();
      renderCart();
    });

    const quantitySpan = document.createElement("span");
    quantitySpan.className = "cart-item-quantity";
    quantitySpan.textContent = `${item.quantity} stycken`;

    const minusBtn = document.createElement("button");
    minusBtn.textContent = "−";
    minusBtn.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
      updateCartBadge();
      renderCart();
    });

    controls.appendChild(plusBtn);
    controls.appendChild(quantitySpan);
    controls.appendChild(minusBtn);

    itemDiv.appendChild(itemRow);
    itemDiv.appendChild(controls);
    itemsContainer.appendChild(itemDiv);
  });

  cartView.appendChild(itemsContainer);

  // Räkna ut totalen och visa den
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiv = document.createElement("div");
  totalDiv.className = "cart-total";

  const totalLabel = document.createElement("div");
  totalLabel.className = "cart-total-label";
  totalLabel.innerHTML = "<span>TOTALT</span><span>inkl 20% moms</span>";

  const totalAmount = document.createElement("span");
  totalAmount.className = "cart-total-amount";
  totalAmount.textContent = `${total} SEK`;

  totalDiv.appendChild(totalLabel);
  totalDiv.appendChild(totalAmount);
  cartView.appendChild(totalDiv);

  // Skicka order till api och visa bekräftelsesidan
  const checkoutBtn = document.createElement("button");
  checkoutBtn.className = "cart-checkout-btn";
  checkoutBtn.textContent = "TAKE MY MONEY!";
  checkoutBtn.addEventListener("click", async () => {
    // Skapa en alla id så att vi kan uppdatera ordern med antalet av varje
    const items = [];
    cart.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        items.push(parseInt(item.id));
      }
    });
    const orderData = { items };
    console.log("Sending order:", orderData);
    const result = await postOrder(orderData);
    console.log("Order result:", result);
    // Kolla så order var korrekt skapad
    if (result && (result.id || result.order)) {
      const orderInfo = result.order || result;
      renderConfirmation(orderInfo);
      showView("receipt-view");
      // ränsa varukorgen efter bestälnning
      cart.length = 0;
      updateCartBadge();
    } else {
      alert("Kunde inte lägga beställningen. Försök igen.");
    }
  });
  cartView.appendChild(checkoutBtn);
}

// Renderar checkout sidan
export function renderCheckout() {
  const checkoutView = document.querySelector(".checkout-view");
  checkoutView.innerHTML = "<h1>Kassa</h1>";
  if (cart.length === 0) {
    checkoutView.innerHTML += "<p>Ingen beställning</p>";
    return;
  }
  let total = 0;
  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.textContent = `${item.name} - ${item.price}kr x ${item.quantity} = ${item.price * item.quantity}kr`;
    checkoutView.appendChild(itemDiv);
    total += item.price * item.quantity;
  });

  const totalDiv = document.createElement("div");
  totalDiv.textContent = `Total: ${total}kr`;
  checkoutView.appendChild(totalDiv);

  const orderBtn = document.createElement("button");
  orderBtn.textContent = "Lägg beställning";
  orderBtn.addEventListener("click", async () => {
    const orderData = {
      items: cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        type: item.type,
      })),
    };
    const result = await postOrder(orderData);
    if (result) {
      renderReceipt(result);
      showView("receipt-view");
      cart.length = 0;
      updateCartBadge();
    }
  });

  checkoutView.appendChild(orderBtn);
}
// Renderar konfermations sidan efter beställning
export function renderConfirmation(orderResult) {
  const receiptView = document.querySelector(".receipt-view");
  receiptView.innerHTML = "";

  const imgContainer = document.createElement("div");
  imgContainer.className = "confirmation-image";
  const img = document.createElement("img");
  img.src = "assets/images/foodbox.png";
  img.alt = "Matlåda";
  imgContainer.appendChild(img);
  receiptView.appendChild(imgContainer);

  const heading = document.createElement("h1");
  heading.className = "confirmation-heading";
  heading.textContent = "DINA WONTONS TILLAGAS!";
  receiptView.appendChild(heading);

  // Räkna ut och visa ETA
  const eta = document.createElement("p");
  eta.className = "confirmation-eta";
  let etaMinutes = 5;
  if (orderResult.eta) {
    const etaTime = new Date(orderResult.eta);
    const now = new Date();
    const diffMs = etaTime - now;
    // konvertera millisekunder till minuter
    etaMinutes = Math.max(1, Math.ceil(diffMs / 60000));
  }
  eta.textContent = `ETA ${etaMinutes} MIN`;
  receiptView.appendChild(eta);

  // Skapar order id
  const orderId = document.createElement("p");
  orderId.className = "confirmation-order-id";
  orderId.textContent = `#${orderResult.id}`;
  receiptView.appendChild(orderId);

  const btnContainer = document.createElement("div");
  btnContainer.className = "confirmation-buttons";

  const receiptBtn = document.createElement("button");
  receiptBtn.className = "confirmation-btn-outline";
  receiptBtn.textContent = "SE KVITTO";
  receiptBtn.addEventListener("click", () => {
    renderReceipt(orderResult);
  });
  btnContainer.appendChild(receiptBtn);

  const newOrderBtn = document.createElement("button");
  newOrderBtn.className = "confirmation-btn-solid";
  newOrderBtn.textContent = "GÖR EN NY BESTÄLLNING";
  newOrderBtn.addEventListener("click", () => showView("menu-view"));
  btnContainer.appendChild(newOrderBtn);

  receiptView.appendChild(btnContainer);
}

// renderar kvittot efter beställning
export function renderReceipt(orderResult) {
  const receiptView = document.querySelector(".receipt-view");
  receiptView.innerHTML = "";

  const h1 = document.createElement("h1");
  h1.className = "receipt-heading";
  h1.textContent = "KVITTO";
  receiptView.appendChild(h1);

  const orderId = document.createElement("p");
  orderId.className = "receipt-order-id";
  orderId.textContent = `Order: #${orderResult.id}`;
  receiptView.appendChild(orderId);

  if (orderResult.items) {
    const itemsContainer = document.createElement("div");
    itemsContainer.className = "receipt-items";
    orderResult.items.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "receipt-item";
      itemDiv.textContent = `${item.name || item.id} x ${item.quantity}`;
      itemsContainer.appendChild(itemDiv);
    });
    receiptView.appendChild(itemsContainer);
  }

  const newOrderBtn = document.createElement("button");
  newOrderBtn.className = "confirmation-btn-solid";
  newOrderBtn.textContent = "GÖR EN NY BESTÄLLNING";
  newOrderBtn.addEventListener("click", () => showView("menu-view"));
  receiptView.appendChild(newOrderBtn);
}

export function showView(viewClass) {
  const views = document.querySelectorAll(
    ".menu-view, .cart-view, .checkout-view, .receipt-view",
  );
  views.forEach((view) => (view.style.display = "none"));

  document.querySelector(`.${viewClass}`).style.display = "block";

  if (viewClass === "cart-view") {
    renderCart();
  } else if (viewClass === "checkout-view") {
    renderCheckout();
  }
}
