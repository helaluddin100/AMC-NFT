const axios = require("axios");

function getCrossmintBaseUrl(environment) {
  return environment === "production"
    ? "https://www.crossmint.com"
    : "https://staging.crossmint.com";
}

function buildRecipient(email, chain) {
  return `email:${email}:${chain}`;
}

function buildNftMetadata() {
  const name = (process.env.CROSSMINT_NFT_NAME || "Ape Mafia Club").slice(0, 32);
  const description = (
    process.env.CROSSMINT_NFT_DESCRIPTION ||
    "Unique hand-drawn Ape Mafia Club member."
  ).slice(0, 64);
  const image =
    process.env.CROSSMINT_NFT_IMAGE_URL ||
    "https://www.crossmint.com/assets/crossmint/logo.png";

  return {
    name,
    description,
    image,
    attributes: [
      { trait_type: "Collection", value: "Ape Mafia Club" },
      { trait_type: "Delivery", value: "Email" },
    ],
  };
}

async function mintNftToEmail({
  apiKey,
  environment,
  collectionId,
  email,
  chain,
}) {
  const baseUrl = getCrossmintBaseUrl(environment);
  const url = `${baseUrl}/api/2022-06-09/collections/${collectionId}/nfts`;
  const body = {
    recipient: buildRecipient(email, chain),
    sendNotification: true,
    locale: "en-US",
    metadata: buildNftMetadata(),
  };

  try {
    const response = await axios.post(url, body, {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-api-key": apiKey,
      },
      timeout: 30000,
      validateStatus: () => true,
    });
    return { status: response.status, data: response.data || {} };
  } catch (error) {
    return {
      status: 503,
      data: { message: error.message || "Crossmint request failed" },
    };
  }
}

async function getActionStatus({ apiKey, environment, actionId }) {
  const baseUrl = getCrossmintBaseUrl(environment);
  const url = `${baseUrl}/api/2022-06-09/actions/${actionId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        "x-api-key": apiKey,
      },
      timeout: 20000,
      validateStatus: () => true,
    });
    return { status: response.status, data: response.data || {} };
  } catch (error) {
    return {
      status: 503,
      data: { message: error.message || "Crossmint status request failed" },
    };
  }
}

module.exports = {
  getCrossmintBaseUrl,
  buildRecipient,
  buildNftMetadata,
  mintNftToEmail,
  getActionStatus,
};
