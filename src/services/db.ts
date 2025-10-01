import fs from "fs/promises";
import path from "path";


const DB_PATH = path.join(process.cwd(), "src", "data", "db.json");

type DB = {
  users: any[];
  films: any[];
  series: any[];
};


export async function loadDB(): Promise<DB> {
  try {
    const raw = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(raw) as DB;
  } catch {
    
    return { users: [], films: [], series: [] };
  }
}


export async function saveDB(db: DB): Promise<void> {
  const data = JSON.stringify(db, null, 2);
  await fs.writeFile(DB_PATH, data, "utf-8");
}


