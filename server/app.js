// server/app.js (Main Express application file)
const express = require('express');
const dotenv = require('dotenv').config({ path: '../.env' });const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allows frontend to make requests to the backend
app.use(express.json()); // Allows parsing of JSON request body
app.use(express.urlencoded({ extended: false })); // Allows parsing of form data

// Routes
app.use('/api/auth', authRoutes); // /api/auth/register, /api/auth/login
app.use('/api/tasks', taskRoutes); // /api/tasks, /api/tasks/:id

// Basic health check route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));