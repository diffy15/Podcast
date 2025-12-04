import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function createDB() {
  const db = await open({
    filename: process.env.DB_PATH || "./podcast.db",
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS episodes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      audio_url TEXT NOT NULL,
      play_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}
