const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// CORS configuration - IMPORTANT!
app.use(cors({
    origin: [
        "https://material-tracker-system.vercel.app",
        /\.vercel\.app$/,
        "http://localhost:3000"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
}));


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/data', require('./routes/data'));

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: '✅ Material Tracker API is running',
    endpoints: {
      auth: '/api/auth/login, /api/auth/register',
      data: '/api/data/save, /api/data/load/:cluster/:station, /api/data/all'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong!',
    error: err.message 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('🚀 =====================================');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('🚀 =====================================');
});