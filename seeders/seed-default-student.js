// Load environment variables FIRST
require("dotenv").config();

const bcrypt = require("bcryptjs");
const db = require("../models");
const { User } = db;

async function seedDefaultStudent() {
  try {
    console.log("Starting to seed default student user...");

    const studentEmail = "serenestudent@gmail.com";
    const studentPassword = "student123@";
    const studentName = "Default Student";

    // Check if student already exists
    let student = await User.findOne({
      where: { email: studentEmail },
    });

    if (student) {
      console.log(`⏭️  Student user already exists: ${studentEmail}`);
      
      // Update password in case it changed
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(studentPassword, saltRounds);
      await student.update({
        password: hashedPassword,
        role: "user",
        isActive: true,
      });
      console.log(`✅ Updated password for existing student: ${studentEmail}`);
    } else {
      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(studentPassword, saltRounds);

      // Create student user
      student = await User.create({
        name: studentName,
        email: studentEmail,
        password: hashedPassword,
        role: "user",
        isActive: true,
      });
      console.log(`✅ Created default student user: ${studentEmail}`);
    }

    console.log("✅ Default student seeding completed!");
    return student;
  } catch (error) {
    console.error("❌ Error seeding default student:", error);
    throw error;
  }
}

// Run the seeder
if (require.main === module) {
  db.sequelize
    .authenticate()
    .then(() => {
      console.log("✅ Database connected for seeding...");
      return seedDefaultStudent();
    })
    .then(() => {
      console.log("\n✅ Seeding process completed. Exiting...");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Seeding failed:", error.message);
      process.exit(1);
    });
}

module.exports = seedDefaultStudent;

