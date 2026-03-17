const pool = require('../config/db');
const { z } = require('zod');

// Define the validation schema using Zod
const addSchoolSchema = z.object({
    name: z.string().min(1, "School name is required").max(255),
    address: z.string().min(1, "Address is required").max(255),
    latitude: z.number().min(-90, "Latitude must be between -90 and 90").max(90),
    longitude: z.number().min(-180, "Longitude must be between -180 and 180").max(180)
});

const addSchool = async (req, res) => {
    try {
        // 1. Validate the incoming request body
        const validatedData = addSchoolSchema.parse(req.body);

        // 2. Extract validated data
        const { name, address, latitude, longitude } = validatedData;

        // 3. Insert into the database using parameterized queries to prevent SQL Injection
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        const [result] = await pool.execute(query, [name, address, latitude, longitude]);

        // 4. Send success response
        res.status(201).json({
            success: true,
            message: 'School added successfully',
            data: {
                id: result.insertId,
                name,
                address,
                latitude,
                longitude
            }
        });

    } catch (error) {
        // Handle Zod validation errors specifically
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: error.errors.map(err => ({ field: err.path[0], message: err.message }))
            });
        }

        // Handle general server errors
        console.error('Error adding school:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const { calculateDistance } = require('../utils/haversine');

// Validation schema for listing schools (GET request uses req.query)
const listSchoolsSchema = z.object({
    latitude: z.string().transform((val) => parseFloat(val)).refine((val) => !isNaN(val) && val >= -90 && val <= 90, {
        message: "Valid latitude is required (-90 to 90)"
    }),
    longitude: z.string().transform((val) => parseFloat(val)).refine((val) => !isNaN(val) && val >= -180 && val <= 180, {
        message: "Valid longitude is required (-180 to 180)"
    })
});

const listSchools = async (req, res) => {
    try {
        // 1. Validate the query parameters (latitude and longitude from the user)
        const validatedQuery = listSchoolsSchema.parse(req.query);
        const userLat = validatedQuery.latitude;
        const userLon = validatedQuery.longitude;

        // 2. Fetch all schools from the database
        const [schools] = await pool.execute('SELECT * FROM schools');

        // If no schools exist yet
        if (schools.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No schools found in the database.',
                data: []
            });
        }

        // 3. Calculate distance for each school and attach it to the object
        const schoolsWithDistance = schools.map(school => {
            const distance = calculateDistance(userLat, userLon, school.latitude, school.longitude);
            return {
                ...school,
                distance: parseFloat(distance.toFixed(2)) // Keep it to 2 decimal places for readability
            };
        });

        // 4. Sort the array by distance (ascending order - closest first)
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        // 5. Send the sorted response
        res.status(200).json({
            success: true,
            message: 'Schools fetched and sorted by proximity successfully',
            data: schoolsWithDistance
        });

    } catch (error) {
         if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                message: 'Invalid query parameters',
                errors: error.errors.map(err => ({ field: err.path[0], message: err.message }))
            });
        }

        console.error('Error listing schools:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = {
    addSchool,
    listSchools
};