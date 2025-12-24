// Load environment variables FIRST
require("dotenv").config();

const db = require("../models");
const {
  School,
  Student,
  Teacher,
  Event,
  Notification,
  Document,
  ClassData,
  Division,
  AcademicYear,
} = db;

// Helper function to generate random code
function generateCode(prefix, length = 8) {
  const randomNum = Math.floor(Math.random() * 90000000) + 10000000;
  return `${prefix}_${randomNum}`.substring(0, length).toUpperCase();
}

// Helper function to generate random phone number
function generatePhoneNumber() {
  const prefix = Math.floor(Math.random() * 9000) + 1000;
  const suffix = Math.floor(Math.random() * 9000000) + 1000000;
  return `${prefix}${suffix}`;
}

// Helper function to generate email
function generateEmail(domain, name) {
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${cleanName}@${domain}`;
}

// Helper function to get random date in range
function getRandomDate(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
  return new Date(randomTime);
}

// Seed Students
async function seedStudents() {
  try {
    console.log("\n👨‍🎓 Seeding Students...");
    let count = 0;
    
    // Get schools, classes, and divisions
    const schools = await School.findAll({ limit: 50, where: { status: true } });
    const classes = await ClassData.findAll({ limit: 200, where: { status: true } });
    const divisions = await Division.findAll({ limit: 500, where: { status: true } });
    
    if (schools.length === 0) {
      console.log("  ⚠️  No schools found. Skipping students seeding.");
      return;
    }
    
    if (classes.length === 0) {
      console.log("  ⚠️  No classes found. Skipping students seeding.");
      return;
    }
    
    if (divisions.length === 0) {
      console.log("  ⚠️  No divisions found. Skipping students seeding.");
      return;
    }

    const firstNames = [
      "Aarav", "Aditi", "Akshay", "Ananya", "Arjun", "Avani", "Dev", "Diya",
      "Ishaan", "Kavya", "Mohit", "Neha", "Rahul", "Priya", "Rohan", "Sneha",
      "Vikram", "Zara", "Aryan", "Isha", "Karan", "Meera", "Ravi", "Sanya",
      "Yash", "Anika", "Kabir", "Pooja", "Siddharth", "Tanvi", "Vivek", "Aisha",
      "John", "Sarah", "Michael", "Emily", "David", "Jessica", "James", "Emma",
      "Robert", "Olivia", "William", "Sophia", "Richard", "Isabella", "Joseph", "Mia"
    ];

    const lastNames = [
      "Sharma", "Patel", "Kumar", "Singh", "Gupta", "Verma", "Reddy", "Mehta",
      "Joshi", "Malhotra", "Agarwal", "Nair", "Iyer", "Menon", "Pillai", "Nair",
      "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
      "Rodriguez", "Martinez", "Hernandez", "Lopez", "Wilson", "Anderson", "Thomas", "Taylor"
    ];

    // Create students for each school (20-50 students per school)
    for (const school of schools) {
      const numStudents = Math.floor(Math.random() * 31) + 20; // 20-50 students
      const schoolClasses = classes.filter(c => c.schoolCode === school.code);
      const schoolDivisions = divisions.filter(d => d.schoolCode === school.code);
      
      if (schoolClasses.length === 0 || schoolDivisions.length === 0) {
        continue;
      }
      
      for (let i = 0; i < numStudents; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const fullName = `${firstName} ${lastName}`;
        const studentId = `STU${String(count + 1).padStart(6, "0")}`;
        
        const existing = await Student.findOne({
          where: { studentId },
        });

        if (!existing) {
          const randomClass = schoolClasses[Math.floor(Math.random() * schoolClasses.length)];
          const classDivisions = schoolDivisions.filter(d => d.classCode === randomClass.code);
          const randomDivision = classDivisions.length > 0 
            ? classDivisions[Math.floor(Math.random() * classDivisions.length)]
            : schoolDivisions[Math.floor(Math.random() * schoolDivisions.length)];
          
          const dateOfBirth = getRandomDate("2005-01-01", "2015-12-31");
          const enrollmentDate = getRandomDate("2020-06-01", "2024-06-01");
          
          await Student.create({
            name: fullName,
            studentId,
            email: generateEmail("student.school.edu", fullName),
            phone: generatePhoneNumber(),
            dateOfBirth,
            address: `${Math.floor(Math.random() * 999) + 1} Street, ${school.name} Area`,
            parentName: `${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
            parentPhone: generatePhoneNumber(),
            parentEmail: generateEmail("parent.school.edu", fullName),
            enrollmentDate,
            classId: randomClass.id,
            divisionId: randomDivision ? randomDivision.id : null,
            schoolId: school.id,
            status: Math.random() > 0.1 ? "active" : "inactive", // 90% active
          });
          count++;
          if (count % 10 === 0) {
            console.log(`  ✅ Created ${count} students...`);
          }
        }
      }
    }
    
    console.log(`  📊 Created ${count} new students`);
  } catch (error) {
    console.error("  ❌ Error seeding students:", error.message);
    throw error;
  }
}

// Seed Teachers
async function seedTeachers() {
  try {
    console.log("\n👨‍🏫 Seeding Teachers...");
    let count = 0;
    
    // Get schools
    const schools = await School.findAll({ limit: 50, where: { status: true } });
    
    if (schools.length === 0) {
      console.log("  ⚠️  No schools found. Skipping teachers seeding.");
      return;
    }

    const firstNames = [
      "Dr. Priya", "Prof. Rajesh", "Mrs. Anjali", "Mr. Vikram", "Ms. Kavita",
      "Dr. Sanjay", "Mrs. Meera", "Mr. Ramesh", "Ms. Deepika", "Prof. Amit",
      "Mrs. Sunita", "Mr. Naresh", "Dr. Pooja", "Ms. Radha", "Mr. Suresh",
      "Mrs. Lakshmi", "Prof. Manoj", "Dr. Swati", "Mr. Ajay", "Ms. Ritu",
      "Dr. Sarah", "Prof. Michael", "Mrs. Jennifer", "Mr. David", "Ms. Lisa",
      "Dr. Robert", "Mrs. Mary", "Mr. John", "Ms. Susan", "Prof. James"
    ];

    const lastNames = [
      "Sharma", "Patel", "Kumar", "Singh", "Gupta", "Verma", "Reddy", "Mehta",
      "Joshi", "Malhotra", "Agarwal", "Nair", "Iyer", "Menon", "Pillai",
      "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"
    ];

    const subjects = [
      ["Mathematics", "Physics"],
      ["Science", "Chemistry"],
      ["English", "Literature"],
      ["History", "Geography"],
      ["Biology", "Chemistry"],
      ["Physics", "Mathematics"],
      ["Computer Science", "Mathematics"],
      ["Art", "Design"],
      ["Music", "Drama"],
      ["Physical Education", "Health"],
      ["Economics", "Business Studies"],
      ["Psychology", "Sociology"],
      ["Languages", "Communication"],
    ];

    const classNames = [
      ["Grade 9", "Grade 10"],
      ["Grade 10", "Grade 11"],
      ["Grade 11", "Grade 12"],
      ["Grade 6", "Grade 7", "Grade 8"],
      ["Grade 1", "Grade 2", "Grade 3"],
      ["Grade 4", "Grade 5"],
    ];

    // Create teachers for each school (5-15 teachers per school)
    for (const school of schools) {
      const numTeachers = Math.floor(Math.random() * 11) + 5; // 5-15 teachers
      
      for (let i = 0; i < numTeachers; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const fullName = `${firstName} ${lastName}`;
        const employeeId = `EMP${String(count + 1).padStart(6, "0")}`;
        
        const existing = await Teacher.findOne({
          where: { employeeId },
        });

        if (!existing) {
          const randomSubjects = subjects[Math.floor(Math.random() * subjects.length)];
          const randomClasses = classNames[Math.floor(Math.random() * classNames.length)];
          
          await Teacher.create({
            name: fullName,
            employeeId,
            email: generateEmail("teacher.school.edu", fullName),
            phone: generatePhoneNumber(),
            subjects: randomSubjects,
            classes: randomClasses,
            schoolId: school.id,
            status: Math.random() > 0.1 ? "active" : "inactive", // 90% active
          });
          count++;
          if (count % 5 === 0) {
            console.log(`  ✅ Created ${count} teachers...`);
          }
        }
      }
    }
    
    console.log(`  📊 Created ${count} new teachers`);
  } catch (error) {
    console.error("  ❌ Error seeding teachers:", error.message);
    throw error;
  }
}

// Seed Events
async function seedEvents() {
  try {
    console.log("\n📅 Seeding Events...");
    let count = 0;
    
    // Get schools
    const schools = await School.findAll({ limit: 50, where: { status: true } });
    
    if (schools.length === 0) {
      console.log("  ⚠️  No schools found. Skipping events seeding.");
      return;
    }

    const eventTemplates = [
      { title: "Annual Day Celebration", type: "event", description: "Annual day celebration with cultural programs and awards" },
      { title: "Sports Day", type: "event", description: "Inter-school sports competition" },
      { title: "Science Exhibition", type: "event", description: "Student science projects exhibition" },
      { title: "Mid-Term Examinations", type: "exam", description: "Mid-term examinations for all classes" },
      { title: "Final Examinations", type: "exam", description: "Final examinations for all classes" },
      { title: "Unit Test", type: "exam", description: "Unit test for all classes" },
      { title: "Republic Day", type: "holiday", description: "National holiday - Republic Day" },
      { title: "Independence Day", type: "holiday", description: "National holiday - Independence Day" },
      { title: "Gandhi Jayanti", type: "holiday", description: "National holiday - Gandhi Jayanti" },
      { title: "Diwali Holiday", type: "holiday", description: "Festival holiday - Diwali" },
      { title: "Parent-Teacher Meeting", type: "meeting", description: "Quarterly parent-teacher meeting" },
      { title: "Staff Meeting", type: "meeting", description: "Monthly staff meeting" },
      { title: "Board Meeting", type: "meeting", description: "School board meeting" },
      { title: "Workshop on Digital Learning", type: "event", description: "Teacher training workshop" },
      { title: "Career Counseling Session", type: "event", description: "Career guidance for students" },
    ];

    // Create events for each school (10-20 events per school)
    for (const school of schools) {
      const numEvents = Math.floor(Math.random() * 11) + 10; // 10-20 events
      
      for (let i = 0; i < numEvents; i++) {
        const template = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
        const eventDate = getRandomDate("2024-01-01", "2025-12-31");
        const timeSlots = ["09:00 AM", "10:00 AM", "02:00 PM", "03:00 PM", "All Day"];
        const randomTime = timeSlots[Math.floor(Math.random() * timeSlots.length)];
        
        const existing = await Event.findOne({
          where: { 
            title: template.title,
            date: eventDate.toISOString().split("T")[0],
            schoolId: school.id,
          },
        });

        if (!existing) {
          await Event.create({
            title: template.title,
            description: template.description,
            date: eventDate.toISOString().split("T")[0],
            time: randomTime,
            type: template.type,
            schoolId: school.id,
            status: Math.random() > 0.2 ? true : false, // 80% active
          });
          count++;
          if (count % 10 === 0) {
            console.log(`  ✅ Created ${count} events...`);
          }
        }
      }
    }
    
    console.log(`  📊 Created ${count} new events`);
  } catch (error) {
    console.error("  ❌ Error seeding events:", error.message);
    throw error;
  }
}

// Seed Notifications
async function seedNotifications() {
  try {
    console.log("\n🔔 Seeding Notifications...");
    let count = 0;
    
    // Get schools
    const schools = await School.findAll({ limit: 50, where: { status: true } });
    
    if (schools.length === 0) {
      console.log("  ⚠️  No schools found. Skipping notifications seeding.");
      return;
    }

    const notificationTemplates = [
      { title: "New Student Registration", message: "5 new students have been registered today", type: "info" },
      { title: "Critical Case Alert", message: "2 students require immediate attention", type: "warning" },
      { title: "Attendance Update", message: "Daily attendance marked for all classes", type: "success" },
      { title: "Mood Tracking", message: "156 students logged their mood today", type: "info" },
      { title: "Exam Schedule Released", message: "Mid-term exam schedule has been published", type: "info" },
      { title: "Holiday Notice", message: "School will be closed on upcoming holiday", type: "info" },
      { title: "Parent-Teacher Meeting", message: "PTM scheduled for next week", type: "info" },
      { title: "Fee Payment Reminder", message: "Last date for fee payment approaching", type: "warning" },
      { title: "Sports Day Registration", message: "Registration open for annual sports day", type: "info" },
      { title: "Library Book Return", message: "Please return library books before due date", type: "warning" },
      { title: "Achievement Alert", message: "Student won first prize in science competition", type: "success" },
      { title: "System Maintenance", message: "School portal will be under maintenance tonight", type: "info" },
    ];

    // Create notifications for each school (15-30 notifications per school)
    for (const school of schools) {
      const numNotifications = Math.floor(Math.random() * 16) + 15; // 15-30 notifications
      
      for (let i = 0; i < numNotifications; i++) {
        const template = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)];
        const notificationDate = getRandomDate("2024-01-01", new Date());
        
        await Notification.create({
          title: template.title,
          message: template.message,
          type: template.type,
          schoolId: school.id,
          read: Math.random() > 0.6 ? true : false, // 40% read
          status: true,
          createdAt: notificationDate,
          updatedAt: notificationDate,
        });
        count++;
        if (count % 20 === 0) {
          console.log(`  ✅ Created ${count} notifications...`);
        }
      }
    }
    
    console.log(`  📊 Created ${count} new notifications`);
  } catch (error) {
    console.error("  ❌ Error seeding notifications:", error.message);
    throw error;
  }
}

// Seed Documents
async function seedDocuments() {
  try {
    console.log("\n📄 Seeding Documents...");
    let count = 0;
    
    // Get schools
    const schools = await School.findAll({ limit: 50, where: { status: true } });
    
    if (schools.length === 0) {
      console.log("  ⚠️  No schools found. Skipping documents seeding.");
      return;
    }

    const documentTemplates = [
      { name: "School Policy Document.pdf", type: "PDF", size: "2.5 MB" },
      { name: "Student Handbook.pdf", type: "PDF", size: "5.1 MB" },
      { name: "Academic Calendar.xlsx", type: "Excel", size: "1.2 MB" },
      { name: "Fee Structure.pdf", type: "PDF", size: "800 KB" },
      { name: "Exam Schedule.pdf", type: "PDF", size: "1.5 MB" },
      { name: "Syllabus 2024-25.pdf", type: "PDF", size: "3.2 MB" },
      { name: "Teacher Guidelines.docx", type: "Word", size: "950 KB" },
      { name: "Parent Circular.pdf", type: "PDF", size: "1.1 MB" },
      { name: "Sports Day Program.pdf", type: "PDF", size: "2.8 MB" },
      { name: "Annual Report 2024.pdf", type: "PDF", size: "4.5 MB" },
      { name: "Library Rules.pdf", type: "PDF", size: "600 KB" },
      { name: "Transportation Policy.pdf", type: "PDF", size: "1.3 MB" },
    ];

    const uploadedByOptions = ["Admin", "Principal", "Vice Principal", "School Coordinator", "System"];

    // Create documents for each school (5-15 documents per school)
    for (const school of schools) {
      const numDocuments = Math.floor(Math.random() * 11) + 5; // 5-15 documents
      
      for (let i = 0; i < numDocuments; i++) {
        const template = documentTemplates[Math.floor(Math.random() * documentTemplates.length)];
        const documentDate = getRandomDate("2023-01-01", new Date());
        
        const existing = await Document.findOne({
          where: { 
            name: template.name,
            schoolId: school.id,
          },
        });

        if (!existing) {
          await Document.create({
            name: template.name,
            type: template.type,
            size: template.size,
            filePath: `/uploads/documents/${school.code}_${template.name}`,
            uploadedBy: uploadedByOptions[Math.floor(Math.random() * uploadedByOptions.length)],
            schoolId: school.id,
            status: true,
            createdAt: documentDate,
            updatedAt: documentDate,
          });
          count++;
          if (count % 5 === 0) {
            console.log(`  ✅ Created ${count} documents...`);
          }
        }
      }
    }
    
    console.log(`  📊 Created ${count} new documents`);
  } catch (error) {
    console.error("  ❌ Error seeding documents:", error.message);
    throw error;
  }
}

// Main seeding function
async function seedAllSchoolData() {
  try {
    console.log("🚀 Starting School Data Seeding...");
    console.log("=".repeat(60));

    // Authenticate database connection
    await db.sequelize.authenticate();
    console.log("✅ Database connected successfully!\n");

    // Seed in order (respecting dependencies)
    await seedStudents(); // Students depend on Schools, Classes, and Divisions
    await seedTeachers(); // Teachers depend on Schools
    await seedEvents(); // Events depend on Schools
    await seedNotifications(); // Notifications depend on Schools
    await seedDocuments(); // Documents depend on Schools

    console.log("\n" + "=".repeat(60));
    console.log("🎉 School Data Seeding Completed Successfully!");
    console.log("=".repeat(60));
    
    // Print summary
    const studentCount = await Student.count();
    const teacherCount = await Teacher.count();
    const eventCount = await Event.count();
    const notificationCount = await Notification.count();
    const documentCount = await Document.count();
    
    console.log("\n📊 School Data Summary:");
    console.log(`  👨‍🎓 Students: ${studentCount}`);
    console.log(`  👨‍🏫 Teachers: ${teacherCount}`);
    console.log(`  📅 Events: ${eventCount}`);
    console.log(`  🔔 Notifications: ${notificationCount}`);
    console.log(`  📄 Documents: ${documentCount}`);
    
  } catch (error) {
    console.error("\n❌ Error during seeding:", error);
    throw error;
  }
}

// Run the seeder if executed directly
if (require.main === module) {
  seedAllSchoolData()
    .then(() => {
      console.log("\n✅ Seeding process completed. Exiting...");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n❌ Seeding failed:", error.message);
      process.exit(1);
    });
}

module.exports = seedAllSchoolData;


