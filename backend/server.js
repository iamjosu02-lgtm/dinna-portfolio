require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://dinna-portfolio.vercel.app',
  'https://frontend-ashen-eight-46.vercel.app',
  'https://dinna-portfolio-api.onrender.com',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.some((o) => origin === o || origin.endsWith('.vercel.app'))) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
  })
);

app.use(express.json());

const portfolioProfile = {
  name: 'Dinna Michael',
  title: 'Software Developer & Cloud Computing Student',
  phone: '0764709993',
  handle: 'dinna@170',
  email: process.env.CONTACT_EMAIL || 'dinna@170@example.com',
  skills: ['Web Development', 'App Development', 'Backend', 'Cloud & DevOps'],
  social: {
    github: 'https://github.com/dinna170',
    instagram: 'https://instagram.com/dinna170',
    twitter: 'https://twitter.com/dinna170',
    linkedin: 'https://linkedin.com/in/dinna170',
  },
};

const contactMessages = [];

app.get('/', (req, res) => {
  res.json({
    message: 'Dinna Michael Portfolio API',
    endpoints: {
      health: 'GET /api/health',
      profile: 'GET /api/profile',
      contact: 'POST /api/contact',
      messages: 'GET /api/messages (demo)',
    },
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/profile', (req, res) => {
  res.json(portfolioProfile);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const entry = {
    id: contactMessages.length + 1,
    name: String(name).trim(),
    email: String(email).trim(),
    message: String(message).trim(),
    createdAt: new Date().toISOString(),
  };

  contactMessages.push(entry);
  console.log('[Contact]', entry);

  res.status(201).json({
    success: true,
    message: 'Thank you! Your message was received successfully.',
    data: { id: entry.id },
  });
});

app.get('/api/messages', (req, res) => {
  res.json({ count: contactMessages.length, messages: contactMessages });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Portfolio API running on port ${PORT}`);
  });
}

module.exports = app;
