const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const {
  normalizeEmail,
  getClaim,
  upsertClaim,
} = require("./store");
const { mintNftToEmail, getActionStatus } = require("./crossmint");
const {
  getCheckoutApiKey,
  getClientApiKey,
  createCardCheckoutOrder,
  buildEmbeddedCheckoutUrl,
} = require("./checkout");

const app = express();
const PORT = process.env.API_PORT || 4000;

// CRA dev proxy sends X-Forwarded-For; required by express-rate-limit v6.
app.set("trust proxy", 1);

app.use(express.json({ limit: "32kb" }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  })
);

const mintLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: true,
    message: "Too many mint requests. Please try again later.",
  },
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function detectKeyEnvironment(apiKey) {
  if (apiKey.startsWith("sk_production_") || apiKey.startsWith("ck_production_")) {
    return "production";
  }
  if (apiKey.startsWith("sk_staging_") || apiKey.startsWith("ck_staging_")) {
    return "staging";
  }
  return null;
}

function resolveEnvironment() {
  const apiKey = process.env.CROSSMINT_API_KEY || "";
  const keyEnvironment = detectKeyEnvironment(apiKey);
  const configured = (process.env.CROSSMINT_ENVIRONMENT || "").toLowerCase();

  if (
    keyEnvironment &&
    (configured === "production" || configured === "staging") &&
    configured !== keyEnvironment
  ) {
    console.warn(
      `[config] CROSSMINT_ENVIRONMENT=${configured} does not match API key (${keyEnvironment}). Using ${keyEnvironment}.`
    );
    return keyEnvironment;
  }

  if (configured === "production" || configured === "staging") {
    return configured;
  }

  return keyEnvironment || "staging";
}

function getServerConfig() {
  const apiKey = process.env.CROSSMINT_API_KEY || "";
  const collectionId =
    process.env.CROSSMINT_COLLECTION_ID ||
    process.env.REACT_APP_CROSSMINT_COLLECTION_ID ||
    "";
  const environment = resolveEnvironment();
  const chain = (process.env.CROSSMINT_CHAIN || "polygon").toLowerCase();
  const allowProduction =
    String(process.env.CROSSMINT_ALLOW_PRODUCTION_MINT || "").toLowerCase() ===
    "true";

  return { apiKey, collectionId, environment, chain, allowProduction };
}

function isValidEmail(email) {
  return EMAIL_REGEX.test(email) && email.length <= 254;
}

app.get("/api/health", (_req, res) => {
  const { environment, collectionId, allowProduction } = getServerConfig();
  res.json({
    ok: true,
    environment,
    collectionConfigured: Boolean(collectionId),
    productionMintAllowed: allowProduction,
    requiresClaimCode: Boolean(process.env.CROSSMINT_CLAIM_CODE),
    checkoutConfigured: Boolean(getCheckoutApiKey() && getClientApiKey()),
  });
});

app.post("/api/create-checkout-order", mintLimiter, async (req, res) => {
  try {
    const email = normalizeEmail(req.body && req.body.email);

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        error: true,
        message: "Please enter a valid email address.",
      });
    }

    const { collectionId, environment, allowProduction } = getServerConfig();
    const checkoutKey = getCheckoutApiKey();
    const clientApiKey = getClientApiKey();

    if (!checkoutKey || !clientApiKey || !collectionId) {
      console.error("[checkout] Missing checkout API key, client key, or collection");
      return res.status(500).json({
        error: true,
        message: "Card checkout is not configured yet.",
      });
    }

    if (environment === "production" && !allowProduction) {
      return res.status(403).json({
        error: true,
        message:
          "Production checkout is disabled until explicitly enabled. Use staging to test.",
      });
    }

    const { status, data } = await createCardCheckoutOrder({
      environment,
      collectionId,
      email,
    });

    if (status < 200 || status >= 300) {
      const crossmintMessage =
        (data && (data.message || data.errorMessage)) || "Unknown Crossmint error";
      console.error("[checkout] Crossmint error status=", status, "message=", crossmintMessage);

      let userMessage = "Unable to start card checkout right now. Please try again.";
      if (/pending verification/i.test(crossmintMessage)) {
        userMessage =
          "Crossmint production payments are blocked until your project is verified. Open Crossmint Console → complete account/project verification, then try again.";
      } else if (status === 403 && /required scopes/i.test(crossmintMessage)) {
        userMessage =
          "Checkout API key is missing orders.create scope. Create a server key with Payments scopes in Crossmint Console.";
      } else if (process.env.NODE_ENV !== "production") {
        userMessage = crossmintMessage;
      }

      return res.status(502).json({
        error: true,
        message: userMessage,
      });
    }

    const orderId = data.order && (data.order.orderId || data.order.id);
    const clientSecret = data.clientSecret;

    if (!orderId || !clientSecret) {
      console.error("[checkout] Missing orderId/clientSecret in response");
      return res.status(502).json({
        error: true,
        message: "Unable to start card checkout right now. Please try again.",
      });
    }

    const checkoutUrl = buildEmbeddedCheckoutUrl({
      environment,
      orderId,
      clientSecret,
    });

    return res.json({
      error: false,
      orderId,
      checkoutUrl,
    });
  } catch (error) {
    console.error("[checkout] Unexpected error:", error && error.message);
    return res.status(500).json({
      error: true,
      message: "Unable to start card checkout right now. Please try again.",
    });
  }
});

app.post("/api/mint-nft", mintLimiter, async (req, res) => {
  try {
    const email = normalizeEmail(req.body && req.body.email);
    const claimCode = String((req.body && req.body.claimCode) || "").trim();

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        error: true,
        message: "Please enter a valid email address.",
      });
    }

    const requiredClaimCode = process.env.CROSSMINT_CLAIM_CODE;
    if (requiredClaimCode && claimCode !== requiredClaimCode) {
      return res.status(403).json({
        error: true,
        message: "Unable to mint your NFT right now. Please try again.",
      });
    }

    const { apiKey, collectionId, environment, chain, allowProduction } =
      getServerConfig();

    if (!apiKey) {
      console.error("[mint-nft] Missing CROSSMINT_API_KEY");
      return res.status(500).json({
        error: true,
        message: "Unable to mint your NFT right now. Please try again.",
      });
    }

    if (!collectionId) {
      console.error("[mint-nft] Missing CROSSMINT_COLLECTION_ID");
      return res.status(500).json({
        error: true,
        message: "Unable to mint your NFT right now. Please try again.",
      });
    }

    if (environment === "production" && !allowProduction) {
      console.warn(
        "[mint-nft] Blocked production mint. Set CROSSMINT_ALLOW_PRODUCTION_MINT=true to enable."
      );
      return res.status(403).json({
        error: true,
        message:
          "Production minting is disabled until explicitly enabled. Use staging to test.",
      });
    }

    const existing = getClaim(email);
    const claimedStatuses = new Set([
      "pending",
      "success",
      "succeeded",
      "submitted",
    ]);
    if (existing && claimedStatuses.has(existing.status)) {
      const alreadyMinted =
        existing.status === "success" || existing.status === "succeeded";
      return res.status(409).json({
        error: true,
        message: alreadyMinted
          ? "This email has already claimed an NFT."
          : "A mint request for this email is already in progress.",
        actionId: existing.actionId || undefined,
        status: existing.status,
      });
    }

    const { status, data } = await mintNftToEmail({
      apiKey,
      environment,
      collectionId,
      email,
      chain,
    });

    if (status < 200 || status >= 300) {
      const crossmintMessage =
        (data && (data.message || data.errorMessage)) || "Unknown Crossmint error";
      console.error(
        "[mint-nft] Crossmint error status=",
        status,
        "message=",
        crossmintMessage
      );

      let userMessage = "Unable to mint your NFT right now. Please try again.";
      if (status === 403 && /staging api key but got production/i.test(crossmintMessage)) {
        userMessage =
          "Crossmint environment mismatch: use a staging API key with staging, or set CROSSMINT_ENVIRONMENT=production for a production key.";
      } else if (status === 403 && /required scopes/i.test(crossmintMessage)) {
        userMessage =
          "Your Crossmint API key is missing the nfts.create scope. Create or select an NFT minting key in the Crossmint console.";
      } else if (process.env.NODE_ENV !== "production") {
        userMessage = crossmintMessage;
      }

      return res.status(502).json({
        error: true,
        message: userMessage,
      });
    }

    const actionId = data.actionId || data.id;
    upsertClaim(email, {
      status: "pending",
      actionId,
      nftId: data.id,
      createdAt: new Date().toISOString(),
    });

    return res.status(200).json({
      error: false,
      message:
        "Your NFT mint request has been submitted. Please wait while we confirm the mint.",
      actionId,
      status: "pending",
    });
  } catch (error) {
    console.error("[mint-nft] Unexpected error:", error && error.message);
    return res.status(500).json({
      error: true,
      message: "Unable to mint your NFT right now. Please try again.",
    });
  }
});

app.get("/api/mint-status/:actionId", async (req, res) => {
  try {
    const actionId = String(req.params.actionId || "").trim();
    if (!actionId || actionId.length > 80) {
      return res.status(400).json({
        error: true,
        message: "Invalid mint status request.",
      });
    }

    const { apiKey, environment } = getServerConfig();
    if (!apiKey) {
      return res.status(500).json({
        error: true,
        message: "Unable to check mint status right now.",
      });
    }

    const { status, data } = await getActionStatus({
      apiKey,
      environment,
      actionId,
    });

    if (status < 200 || status >= 300) {
      console.error("[mint-status] Crossmint error status=", status);
      return res.status(502).json({
        error: true,
        message: "Unable to check mint status right now.",
      });
    }

    const mintStatus = data.status || "pending";

    // Best-effort local claim update by actionId
    try {
      const storePath = require("path").join(__dirname, "data", "mint-claims.json");
      const fs = require("fs");
      if (fs.existsSync(storePath)) {
        const store = JSON.parse(fs.readFileSync(storePath, "utf8"));
        Object.keys(store.claims || {}).forEach((email) => {
          if (store.claims[email].actionId === actionId) {
            upsertClaim(email, { status: mintStatus });
          }
        });
      }
    } catch (storeError) {
      console.error("[mint-status] store update failed:", storeError.message);
    }

    return res.json({
      error: false,
      actionId: data.actionId || actionId,
      status: mintStatus,
      completedAt: data.completedAt || null,
    });
  } catch (error) {
    console.error("[mint-status] Unexpected error:", error && error.message);
    return res.status(500).json({
      error: true,
      message: "Unable to check mint status right now.",
    });
  }
});

app.listen(PORT, () => {
  const { environment, collectionId, allowProduction } = getServerConfig();
  console.log(
    `[api] listening on http://localhost:${PORT} env=${environment} collection=${
      collectionId ? "set" : "missing"
    } productionMint=${allowProduction}`
  );
});
