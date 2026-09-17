import { initializeApp, cert } from "firebase-admin/app";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serviceAccountPath = path.join(__dirname, "../serviceAccount.json");

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
} else if (fs.existsSync(serviceAccountPath)) {
  serviceAccount = JSON.parse(
    fs.readFileSync(serviceAccountPath, "utf8"),
  );
} else {
  throw new Error(
    "Firebase service account is missing. Add FIREBASE_SERVICE_ACCOUNT_JSON or upload serviceAccount.json to Render.",
  );
}

export const app = initializeApp({
  credential: cert(serviceAccount),
});
