const axios = require("axios");
const { getCrossmintBaseUrl } = require("./crossmint");

function getCheckoutApiKey() {
  return (
    process.env.CROSSMINT_CHECKOUT_API_KEY ||
    process.env.CROSSMINT_API_KEY ||
    ""
  );
}

function getClientApiKey() {
  return process.env.REACT_APP_CROSSMINT_CLIENT_API_KEY || "";
}

function getCheckoutPrice() {
  return process.env.REACT_APP_CROSSMINT_PRICE || process.env.CROSSMINT_PRICE || "11";
}

async function createCardCheckoutOrder({
  environment,
  collectionId,
  email,
}) {
  const apiKey = getCheckoutApiKey();
  const baseUrl = getCrossmintBaseUrl(environment);
  const totalPrice = getCheckoutPrice();

  const body = {
    payment: {
      method: "card",
      receiptEmail: email,
    },
    lineItems: [
      {
        collectionLocator: `crossmint:${collectionId}`,
        callData: {
          totalPrice: String(totalPrice),
          quantity: 1,
        },
      },
    ],
    recipient: {
      email,
    },
  };

  try {
    const response = await axios.post(
      `${baseUrl}/api/2022-06-09/orders`,
      body,
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "x-api-key": apiKey,
        },
        timeout: 30000,
        validateStatus: () => true,
      }
    );
    return { status: response.status, data: response.data || {} };
  } catch (error) {
    return {
      status: 503,
      data: { message: error.message || "Failed to create checkout order" },
    };
  }
}

function buildEmbeddedCheckoutUrl({ environment, orderId, clientSecret }) {
  const baseUrl = getCrossmintBaseUrl(environment);
  const clientApiKey = getClientApiKey();
  const payment = JSON.stringify({
    crypto: { enabled: false },
    fiat: {
      enabled: true,
      defaultCurrency: "usd",
      allowedMethods: {
        card: true,
        applePay: true,
        googlePay: true,
      },
    },
  });

  const params = new URLSearchParams({
    orderId,
    clientSecret,
    apiKey: clientApiKey,
    payment,
  });

  return `${baseUrl}/sdk/2024-03-05/embedded-checkout?${params.toString()}`;
}

module.exports = {
  getCheckoutApiKey,
  getClientApiKey,
  createCardCheckoutOrder,
  buildEmbeddedCheckoutUrl,
};
