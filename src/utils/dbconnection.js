const mysql = require('mysql2');

// MySQL connection options
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'smkey',
    database: 'rtb_equipment_distribution_db',
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

module.exports = connection;