import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// MySQL 연결 설정
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// MySQL 연결
db.connect((err) => {
    if (err) {
        console.error("MySQL connection error:", err);
        return;
    }
    console.log("MySQL connection successful!");
});

export default db;
