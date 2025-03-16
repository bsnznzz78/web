require('dotenv').config();
const mysql = require('mysql2');

// Create connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'agriglobal',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convert pool query into promises
const promisePool = pool.promise();

// Test the connection
promisePool.execute('SELECT 1')
    .then(() => {
        console.log('Database connection successful');
        console.log('Connection details:', {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
        });
    })
    .catch(err => {
        console.error('Database connection failed:', err);
        console.error('Please make sure:');
        console.error('1. MySQL server is installed and running');
        console.error('2. Database credentials in .env are correct');
        console.error('3. Database "agriglobal" exists');
        process.exit(1);
    });

module.exports = promisePool;
