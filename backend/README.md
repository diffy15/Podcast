# Podcast Platform - Backend

Backend API for the Mini Podcast Platform built with Node.js and Express.

## Features

- RESTful API
- Audio file upload with Multer
- Episode management (CRUD)
- Play count tracking
- Analytics endpoint
- File-based persistence

## Installation
```bash
npm install
```

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server runs on `http://localhost:3001`

## API Endpoints

### Episodes

- **GET** `/api/episodes` - Get all episodes
- **GET** `/api/episodes/:id` - Get single episode
- **POST** `/api/episodes` - Upload new episode (multipart/form-data)
- **PUT** `/api/episodes/:id` - Update episode details
- **DELETE** `/api/episodes/:id` - Delete episode
- **POST** `/api/episodes/:id/play` - Increment play count

### Analytics

- **GET** `/api/analytics` - Get analytics data

### Health Check

- **GET** `/api/health` - Server health check

## Upload Format

Use `multipart/form-data` with field name `audio` for audio files.

Optional fields:
- `title` - Episode title
- `description` - Episode description

## Response Format
```json
{
  "id": 1,
  "title": "Episode Title",
  "description": "Episode description",
  "filename": "1234567890-123456789.mp3",
  "audioUrl": "/uploads/1234567890-123456789.mp3",
  "duration": 300,
  "uploadDate": "2024-01-01T00:00:00.000Z",
  "playCount": 0,
  "fileSize": 5242880,
  "mimeType": "audio/mpeg"
}
```

## Tech Stack

- Node.js
- Express.js
- Multer (file uploads)
- CORS (cross-origin requests)
- get-audio-duration (audio metadata)

## File Structure