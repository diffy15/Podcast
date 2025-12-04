Mini Podcast App

A simple full-stack podcast application where you can upload audio files, list episodes, play them, and track how many times each episode is played.

Features

Upload audio files (MP3, WAV, etc.)

Episode list with title + description

Dedicated playback page with audio controls

Play count increases automatically

Lightweight backend using Express + SQLite

Tech Stack

Frontend: React, Vite, TailwindCSS
Backend: Node.js, Express, Multer, SQLite
Database: SQLite (local file-based)

Backend Setup
cd backend
npm install


Create a .env file:

PORT=4000
DB_PATH=./podcast.db


Start the server:

npm start


Backend runs on:
http://localhost:4000

Frontend Setup
cd frontend/podcast-ui
npm install


Create .env:

VITE_API_URL=http://localhost:4000


Start frontend:

npm run dev


Frontend runs on:
http://localhost:8081

Available API Routes
Method	Endpoint	Description
POST	/api/episodes	Upload new episode
GET	/api/episodes	Get all episodes
GET	/api/episodes/:id	Get one episode
POST	/api/episodes/:id/play	Increment play count

Project Structure
podcast/
  backend/
  frontend/
