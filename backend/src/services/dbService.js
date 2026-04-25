import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const databaseDir = path.resolve(currentDir, "..", "..", "..", "database");

const resolveFile = (fileName) => path.join(databaseDir, fileName);

export async function readCollection(fileName) {
  const filePath = resolveFile(fileName);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

export async function writeCollection(fileName, data) {
  const filePath = resolveFile(fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  return data;
}
