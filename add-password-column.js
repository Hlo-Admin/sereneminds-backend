require("dotenv").config();
const { Sequelize } = require("sequelize");

// Database connection configuration
let sequelize;

if (process.env.DATABASE_URL) {
  // Use DATABASE_URL for LIVE database (Production/Remote)
  console.log("🔗 Connecting to LIVE database...");
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });
} else if (process.env.DB_HOST && process.env.DB_NAME && process.env.DB_USER) {
  // Use environment variables for LOCAL database
  console.log("🔗 Connecting to LOCAL database...");
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      dialect: "postgres",
      logging: console.log,
    }
  );
} else {
  // Fallback to config/config.json
  const config = require("./config/config.json")[process.env.NODE_ENV || "development"];
  console.log("🔗 Connecting to database (using config.json)...");
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: console.log,
  });
}

async function addPasswordColumn() {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");

    // Check if column already exists
    const [results] = await sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'Students' 
      AND column_name = 'password'
    `);

    if (results.length > 0) {
      console.log("ℹ️  Password column already exists in Students table.");
      process.exit(0);
    }

    // Add the password column
    console.log("🔄 Adding password column to Students table...");
    await sequelize.query(`
      ALTER TABLE "Students" 
      ADD COLUMN "password" VARCHAR(255)
    `);

    console.log("✅ Password column added successfully!");
    console.log("✅ Migration completed!");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding password column:", error.message);
    console.error("Error details:", error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

// Run the migration
addPasswordColumn();

