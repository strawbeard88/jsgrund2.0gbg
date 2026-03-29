export const url = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/";
export let apiKey = null;
export let tenant = null;

async function getApiKey() {
  try {
    const settings = { method: "POST" };
    const keyUrl = url + "keys";
    const response = await fetch(keyUrl, settings);
    const data = await response.json();
    apiKey = data.key;
  } catch (error) {}
}

async function getTenant() {
  const tenantUrl = url + "tenants";
  const bodyToSend = { name: JSON.stringify(Date.now()) };
  const settings = {
    method: "POST",
    body: JSON.stringify(bodyToSend),
    headers: {
      "Content-Type": "application/json",
      "x-zocom": apiKey,
    },
  };
  const response = await fetch(tenantUrl, settings);
  const data = await response.json();
  tenant = data;
}

await getApiKey();
await getTenant();

export async function getMenu() {
  try {
    const menuUrl = url + "menu";
    const settings = {
      method: "GET",
      headers: {
        "x-zocom": apiKey,
      },
    };
    const response = await fetch(menuUrl, settings);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function postOrder(orderData) {
  try {
    const orderUrl = url + tenant.id + "/orders";
    const settings = {
      method: "POST",
      body: JSON.stringify(orderData),
      headers: {
        "Content-Type": "application/json",
        "x-zocom": apiKey,
      },
    };
    const response = await fetch(orderUrl, settings);
    const data = await response.json();
    console.log("Order response:", data);
    return data;
  } catch (error) {
    console.error("Order error:", error);
    return null;
  }
}
