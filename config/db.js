require("dotenv").config(); // load env vars if needed
const { Pool } = require("pg");

let pool;

if (process.env.DATABASE_URL) {
  // ✅ Use DATABASE_URL for LIVE database
  console.log("🔗 Using LIVE database connection (db.js)");
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
} else if (process.env.DB_HOST && process.env.DB_NAME && process.env.DB_USER) {
  // ✅ Use environment variables for LOCAL database
  console.log("🔗 Using LOCAL database connection (db.js)");
  pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: false,
  });
} else {
  // ✅ Fallback - this should not happen if .env is configured properly
  console.error(
    "❌ No database configuration found! Please check your .env file."
  );
  throw new Error(
    "Database configuration missing. Please configure .env file."
  );
}

module.exports = pool;

// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// module.exports = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: 'postgres',
//     logging: false,
//   }
// );
