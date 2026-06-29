// backend/server.js
// ---------------------------------------------------------------
//  Express API entry point
// ---------------------------------------------------------------

require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

// ---------------------------------------------------------------
//  OPTIONAL MONGODB CONNECTION
// ---------------------------------------------------------------
let dbAvailable = false;
try {
  const connectDB = require('./config/db');   // may throw if file missing
  connectDB();                               // may throw if connection fails
  console.log('✅ MongoDB connected');
  dbAvailable = true;
} catch (err) {
  console.warn('⚠️ MongoDB not available – running with in‑memory stubs.');
}

// ---------------------------------------------------------------
//  ROUTES (auth, posts, comments)
// ---------------------------------------------------------------
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

const app = express();

// ---------------------------------------------------------------
//  MIDDLEWARE
// ---------------------------------------------------------------
app.use(cors());                         // enable CORS for all origins
app.use(express.json());                 // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse URL‑encoded bodies

// Health‑check – always available
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', db: dbAvailable });
});

// ---------------------------------------------------------------
//  STATIC FILES (serve the React build)
// ---------------------------------------------------------------
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// ---------------------------------------------------------------
//  API ROUTES
// ---------------------------------------------------------------
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// ---------------------------------------------------------------
//  FALLBACK – serve index.html for SPA routing
// ---------------------------------------------------------------
app.get('*', (req, res) => {
  res.sendFile(
    path.join(__dirname, '..', 'frontend', 'index.html')
  );
});

// ---------------------------------------------------------------
//  SERVER START
// ---------------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
