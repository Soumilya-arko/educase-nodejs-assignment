const express = require('express');
require('dotenv').config();
const pool = require('./config/db');
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Mount the school routes
// We prefix it with /api to follow RESTful best practices (optional, but recommended)
app.use('/api', schoolRoutes);

// Basic health check route
app.get('/', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        connection.release();
        res.send('School Management API is running and connected to the database.');
    } catch (error) {
        res.status(500).send('Database connection failed: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});