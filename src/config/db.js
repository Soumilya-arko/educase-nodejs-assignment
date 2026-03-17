const mysql = require('mysql2/promise');
require('dotenv').config();

// Defensive configuration to protect against hidden spaces in environment variables
const dbConfig = {
    host: (process.env.DB_HOST || '').trim(),
    user: (process.env.DB_USER || '').trim(),
    password: (process.env.DB_PASSWORD || '').trim(),
    database: (process.env.DB_NAME || '').trim(),
    port: parseInt((process.env.DB_PORT || '').trim()) || 20987, // Forces a number, defaults to Aiven's port
    ssl: { rejectUnauthorized: false }, // Absolutely strictly required for Aiven Cloud
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;