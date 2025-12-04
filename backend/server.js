import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

// --- Database initialization ---
let db;

async function initDB() {
  db = await open({
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

  console.log("Database initialized.");
}

// --- File upload configuration ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Serve static audio files
app.use("/uploads", express.static("uploads"));

// --- API Routes ---

// Upload an episode
app.post("/api/episodes", upload.single("audio"), async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Audio file is required" });
    }

    const audioUrl = `/uploads/${req.file.filename}`;

    const result = await db.run(
      `INSERT INTO episodes (title, description, audio_url) VALUES (?, ?, ?)`,
      [title, description, audioUrl]
    );

    const newEpisode = await db.get(
      `SELECT * FROM episodes WHERE id = ?`,
      [result.lastID]
    );

    res.json(newEpisode);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload episode" });
  }
});

// List episodes
app.get("/api/episodes", async (req, res) => {
  const rows = await db.all(
    `SELECT * FROM episodes ORDER BY created_at DESC`
  );
  res.json(rows);
});

// Get single episode
app.get("/api/episodes/:id", async (req, res) => {
  const episode = await db.get(
    `SELECT * FROM episodes WHERE id = ?`,
    [req.params.id]
  );

  if (!episode) return res.status(404).json({ error: "Episode not found" });

  res.json(episode);
});

// Increment play count
app.post("/api/episodes/:id/play", async (req, res) => {
  await db.run(
    `UPDATE episodes SET play_count = play_count + 1 WHERE id = ?`,
    [req.params.id]
  );

  res.json({ success: true });
});

// --- Start server ---
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Mini Podcast Backend is running 🚀");
});


app.listen(PORT, async () => {
  await initDB();
  console.log(`Server running at http://localhost:${PORT}`);
});
