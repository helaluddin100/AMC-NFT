const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "data");
const STORE_FILE = path.join(DATA_DIR, "mint-claims.json");

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(STORE_FILE)) {
    fs.writeFileSync(STORE_FILE, JSON.stringify({ claims: {} }, null, 2));
  }
}

function readStore() {
  ensureStore();
  try {
    return JSON.parse(fs.readFileSync(STORE_FILE, "utf8"));
  } catch (error) {
    return { claims: {} };
  }
}

function writeStore(store) {
  ensureStore();
  fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2));
}

function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

function getClaim(email) {
  const store = readStore();
  return store.claims[normalizeEmail(email)] || null;
}

function upsertClaim(email, data) {
  const store = readStore();
  const key = normalizeEmail(email);
  store.claims[key] = {
    ...(store.claims[key] || {}),
    ...data,
    email: key,
    updatedAt: new Date().toISOString(),
  };
  writeStore(store);
  return store.claims[key];
}

module.exports = {
  normalizeEmail,
  getClaim,
  upsertClaim,
};
