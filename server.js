// // Load env vars
// require("dotenv").config();

// // Import pg Client
// const { Client } = require("pg");

// // Create client with your Neon connection string
// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false, // Neon requires SSL
//   },
// });

// // Connect and test
// async function connectDB() {
//   try {
//     await client.connect();
//     console.log("Connected to Neon PostgreSQL!");

//     // Example: list tables
//     const res = await client.query("SELECT NOW()");
//     console.log("Server time:", res.rows[0]);
//   } catch (err) {
//     console.error("Connection error", err.stack);
//   }
// }

// connectDB();

// const app = require("./app");
// const db = require("./models"); // Import from models/index.js
// const PORT = process.env.PORT || 5000;

// // Test database connection and start server
// db.sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Database connected...");
//     return db.sequelize.sync(); // Sync all models
//   })
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//     process.exit(1); // Exit if DB connection fails
//   });




const app = require('./app');
const db = require('./models'); // Import from models/index.js
const PORT = process.env.PORT || 5000;
require('dotenv').config();

// Test database connection and start server
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return db.sequelize.sync(); // Sync all models without alter
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1); // Exit if DB connection fails
  });

  