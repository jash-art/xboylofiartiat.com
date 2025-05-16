import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import Music from './models/Music.js';
import Profile from './models/Profile.js';
import statusRoute from "./routes/music.js"

dotenv.config();

const app = express();

// Updated CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Improved MongoDB connection with error handling
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Admin authentication middleware
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

app.use("/status", statusRoute);

// Admin login
app.post('/api/admin/login', async (req, res) => {
  console.log('Login request received:', req.body);
  console.log('Request headers:', req.headers);
  console.log('Environment variables:', {
    ADMIN_USERNAME: process.env.ADMIN_USERNAME ? 'set' : 'not set',
    JWT_SECRET: process.env.JWT_SECRET ? 'set' : 'not set'
  });
  const { username, password } = req.body;

  // Replace with your admin credentials
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    console.log('Admin login successful');
    const token = jwt.sign({ id: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } else {
    console.log('Invalid credentials provided');
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Music CRUD operations
app.get('/api/music', async (req, res) => {
  try {
    const music = await Music.find().sort('-releaseDate');
    res.json(music);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/music', authenticateAdmin, async (req, res) => {
  try {
    const music = new Music(req.body);
    await music.save();
    res.status(201).json(music);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/music/:id', authenticateAdmin, async (req, res) => {
  try {
    const music = await Music.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(music);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/music/:id', authenticateAdmin, async (req, res) => {
  try {
    await Music.findByIdAndDelete(req.params.id);
    res.json({ message: 'Music deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Profile operations
app.get('/api/profile', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({ artistName: 'X.BOY', description: '' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/profile', authenticateAdmin, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Root route to check server status
app.get('/', (req, res) => {
  try {

    res.json({ status: 'Server is running', timestamp: new Date() });
  } catch (error) {
    console.log(error);
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));