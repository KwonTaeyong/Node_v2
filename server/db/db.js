const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456789',
    database: 'easyboard',
});

db.connect((err) => {
    if(err) {
        console.error("MySQL connection error:", err);
        return;
    }
    console.log("MySQL connection !");
});

module.exports = db;