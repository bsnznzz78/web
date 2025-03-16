const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');

async function initializeDatabase() {
    let connection;

    try {
        // Create connection without database
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT
        });

        console.log('Connected to MySQL server');

        // Read schema file
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = await fs.readFile(schemaPath, 'utf8');

        // Split schema into individual statements
        const statements = schema
            .split(';')
            .map(statement => statement.trim())
            .filter(statement => statement.length > 0);

        // Execute each statement
        for (const statement of statements) {
            await connection.query(statement);
            console.log('Executed:', statement.slice(0, 50) + '...');
        }

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        if (connection) {
            await connection.end();
            console.log('Database connection closed');
        }
    }
}

// Run the initialization
initializeDatabase();
