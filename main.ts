import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const botDir = process.env.MAKEFUN_BOT_DIR || __dirname;
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

const sourceJsonPath = path.join(botDir, "VIDEO.json");

if (!fs.existsSync(sourceJsonPath)) {
  console.error(`Error: VIDEO.json not found at ${sourceJsonPath}`);
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const targetJsonPath = path.join(outputDir, "VIDEO.json");
fs.copyFileSync(sourceJsonPath, targetJsonPath);

const sourceBytes = fs.readFileSync(sourceJsonPath);
const targetBytes = fs.readFileSync(targetJsonPath);

if (!sourceBytes.equals(targetBytes)) {
  console.error("Error: Copied VIDEO.json bytes do not match source bytes!");
  process.exit(1);
}

const videoData = JSON.parse(sourceBytes.toString("utf8"));
console.log(`Copied VIDEO.json with URL: ${videoData.url}`);
