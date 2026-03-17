const express = require('express');
const router = express.Router();
const { addSchool, listSchools } = require('../controllers/schoolController'); // Import listSchools

// POST /addSchool endpoint
router.post('/addSchool', addSchool);

// GET /listSchools endpoint
router.get('/listSchools', listSchools);

module.exports = router;