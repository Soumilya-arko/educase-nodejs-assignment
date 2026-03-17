# School Management API

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

A robust RESTful API built with Node.js, Express, and MySQL that allows users to seamlessly manage school geographic data. It features strict input validation and calculates real-time spatial proximity using the Haversine formula.

## 🚀 Live Links
- **Live API Base URL:** [Insert your Render URL here]
- **Postman API Documentation:** [Insert your Public Postman Workspace/Collection Link here]

## ✨ Key Features
- **Geographic Proximity Sorting:** Implements the Haversine formula to accurately calculate the great-circle distance between a user's location and registered schools, returning a cleanly sorted list.
- **Strict Data Validation:** Utilizes `zod` to enforce strict schema validation for all incoming API payloads, ensuring database integrity and returning clear, actionable error messages to the client.
- **SQL Injection Prevention:** Employs parameterized queries via `mysql2` prepared statements for all database interactions.
- **Clean Architecture:** Built using an MVC-inspired folder structure separating routes, controllers, and utility functions for high maintainability.

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL (Hosted on Aiven)
- **Validation:** Zod
- **Environment Management:** dotenv

## 📖 API Reference

### 1. Add a New School
Validates and inserts a new school record into the database.
- **Endpoint:** `POST /api/addSchool`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
      "name": "Green Valley High",
      "address": "123 Education Lane, Tech City",
      "latitude": 28.6139,
      "longitude": 77.2090
  }

### 2. List Schools by Proximity
Fetches all schools and sorts them based on their geographic distance from the provided coordinates.
- **Endpoint:** `GET /api/listSchools`
- **Query Parameters:**
 - `latitude (float): User's current latitude. `
 - `longitude (float): User's current longitude.`
- **Example Request:** `/api/listSchools?latitude=28.6139&longitude=77.2090`

### 3. Local Setup & Installation

**1. Clone the repository**
- `git clone [https://github.com/Soumilya-arko/educase-nodejs-assignment.git](https://github.com/Soumilya-arko/educase-nodejs-assignment.git)`
- `cd educase-nodejs-assignment`

**2. Install dependencies**
- `npm install`

**3. Configure Environment Variables**
Create a .env file in the root directory and add your local database credentials:

- `PORT=3000`
- `DB_HOST=localhost`
- `DB_USER=root`
- `DB_PASSWORD=your_mysql_password`
- `DB_NAME=defaultdb`

**4. Initialize the Database**
Execute the provided database.sql script in your MySQL client to generate the required tables.

**5. Start the server**
- `npm run dev`

### Developed by Soumilya Roy
