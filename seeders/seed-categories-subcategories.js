// Load environment variables FIRST
require("dotenv").config();

const db = require("../models");
const { Category, SubCategory } = db;

// Category and SubCategory data from user requirements
const categorySubcategoryData = {
  Family: [
    "New Family Member / Friend",
    "Disagreements with family",
    "Meeting Extended Family",
    "Gift/ money received",
    "Achievements of (Self/Family)",
    "Outings with Family",
    "Distance from Family / Meeting Family after a while",
    "Learning from/ with Family",
    "Playing with Family",
    "Study with Family",
    "Open communication with immediate family",
    "Open communication with extended family",
    "Scared of family",
    "Regular routine with family",
    "Daily family tasks",
    "Family members treating me and others",
    "Family culture",
    "Family behaviour (within and/ or outside)",
    "Death in family",
    "Sickness in family",
    "Rejected by Family",
    "Lied or need to lie to family",
    "Telling a difficult truth to my family",
    "Family is extremley demanding",
    "Family treated me unfairly",
    "Misunderstanding with family",
    "Family support",
    "Patience in Family",
    "Punishment given or to be given by Family",
    "Unable to share my true feelings about my family",
    "Physical safety",
    "Psychological safety / lack of encouragement from family",
    "Family Income and how they deal with money",
    "Family fitness and how they deal with health and fitness",
  ],
  Academics: [
    "Learning opportunities",
    "exam or match performance",
    "Achievements",
    "Variety in learning (sports, academics etc)",
    "Value in regular Academics routine",
    "True feelings",
    "Study or competition pressure",
    "I enjoy my learning and academics",
    "Hardwork (studies or preparation)",
    "School or class representation",
    "Focus and concentration",
    "Studying or in a line/area I am not interested in",
    "New learning",
    "Others getting recognition",
  ],
  Friends: [
    "Outings",
    "Disagreements with Friends",
    "Achievements",
    "New Family Member / Friend",
    "Depth and quality of Friendships",
    "Playing with Friends",
    "Learning from/ with  Friends",
    "Study with Friends",
    "Open communication with Friends",
    "How Friends treat me",
    "Friends culture",
    "Friends behaviour",
    "Death of a Friend",
    "Sickness within Friends",
    "Rejected by Friends",
    "Lied or need to lie to Friends",
    "Telling a difficult truth to my Friends",
    "Friends treated me unfairly",
    "Misunderstanding with Friends",
    "Friends support",
    "True feelings about or with my Friends",
    "Physical safety",
    "Psychological safety / lack of encouragement from Friends",
    "Trust in Friends",
    "Friends judge me on things I do",
    "Respect for Friends",
    "Gift/ money received",
  ],
  "Health & Fitness": [
    "Current Fitness",
    "Achievements",
    "Open communication on my health",
    "Open communication on my fitness",
    "Health and fitness routine",
    "Sickness in known circle",
    "Sickness in news",
    "True feelings",
    "Current Health",
    "Medical condition",
    "Hormonal changes",
    "Physical discomfort/ Trauma",
    "Current mental state",
    "Sleep and Rest",
    "Eating habits",
    "Energy Levels",
  ],
  Money: [
    "Money for extra needs",
    "Achievements",
    "Open communication on money condition",
    "Misunderstandings due to money",
    "Disagreements due to money",
    "Gift/ money received",
    "Gifting someone",
    "Money for basic needs (food, education, clothes, stay)",
    "My Income/ pocket money",
    "Money loss by self",
    "Money loss in Family",
    "Stealing money self",
    "Stealing money others",
    "Facing a Trauma",
    "True feelings",
    "Family Income and how they deal with money",
  ],
  Teachers: [
    "Teacher's behaviour",
    "Achievements",
    "Learning from/ with Teachers",
    "Open communication with Teachers",
    "Scared of Teachers",
    "Regular routine with Teachers",
    "Daily Teacher tasks",
    "Teacher's culture",
    "Rejected by Teacher",
    "Lied or need to lie to Teacher",
    "Telling a difficult truth to my Teacher",
    "Teacher is very demanding",
    "Teacher treated me unfairly",
    "Disagreements with Teacher",
    "Teacher support",
    "Patience in Teacher",
    "Punishment given or to be given by Teacher",
    "True feelings about my Teacher",
    "Physical safety",
    "Psychological safety / lack of encouragement from Teacher",
    "Trust in Teacher",
    "Teacher judge me on things I do",
    "Respect for Teacher",
    "Gift/ money received",
  ],
  "Society/ Environment/ Surroundings": [
    "Surrounding environment",
    "Cafetaria",
    "Cleanliness",
    "Bus / transport",
    "Classrooms",
    "Facilities",
    "Strictness/ discipline in school",
    "Extra curricular activities",
    "Encouragement / Support system",
    "Learning opportunitites",
    "Pressure",
    "Technology use",
    "Responsiveness",
    "Fees",
    "Quality of teaching",
    "Quality of content/ course material",
    "Parent / Teacher interactions",
    "Student / Teacher interactions",
    "Achievements",
  ],
  Self: [
    "Current mental state",
    "Open communications with people",
    "Death in known circle",
    "Sickness in known circle",
    "Death / Sickness in news",
    "Acceptance of a situation",
    "Treated unfairly",
    "Misunderstandings",
    "Disagreements",
    "Support and care",
    "Patience",
    "Innovative idea",
    "Artistic idea/ task",
    "People connections",
    "Part of something bigger than self",
    "Connections with family, friends and loved ones",
    "Current physical state",
    "Clear view of future",
    "Social connections / groups",
    "Comfort zone",
    "Family responsibility",
    "My personality",
    "Desired outcomes",
    "Past actions",
    "Future actions",
    "Perfectionist / Tolerance of self",
    "Perfectionist / Tolerance for others",
    "Physical safety",
    "Psychological safety",
    "Family Income",
    "Hardwork/ Multiple jobs/ Studies",
    "Perform a task I am not interested in",
    "Physical discomfort/ Trauma",
    "Basic needs",
    "Challenging task at hand",
    "Purpose/ direction / Fulfillment",
    "Perceived Threats",
  ],
};

async function seedCategoriesAndSubCategories() {
  try {
    console.log("Starting to seed categories and subcategories...");

    // Seed Categories
    for (const categoryName of Object.keys(categorySubcategoryData)) {
      // Check if category exists
      let category = await Category.findOne({
        where: { name: categoryName },
      });

      if (!category) {
        // Create category if it doesn't exist
        const code = categoryName.toUpperCase().replace(/[\s\/]/g, "_").substring(0, 20);
        category = await Category.create({
          name: categoryName,
          code: code,
          status: true,
        });
        console.log(`✅ Created category: ${categoryName}`);
      } else {
        console.log(`⏭️  Category already exists: ${categoryName}`);
      }

      // Seed SubCategories for this category
      const subCategories = categorySubcategoryData[categoryName];
      let subCategoryIndex = 0;
      for (const subCategoryName of subCategories) {
        // Check if subcategory exists
        const existingSubCategory = await SubCategory.findOne({
          where: { name: subCategoryName, categoryId: category.id },
        });

        if (!existingSubCategory) {
          // Create subcategory if it doesn't exist
          // Generate unique code with timestamp to avoid collisions
          const timestamp = Date.now().toString().slice(-6);
          const categoryCode = categoryName.replace(/[\s\/]/g, "_").substring(0, 8);
          const subCatCode = subCategoryName.replace(/[\s\/]/g, "_").substring(0, 15);
          const code = `${categoryCode}_${subCatCode}_${timestamp}`.toUpperCase().substring(0, 50);
          
          await SubCategory.create({
            name: subCategoryName,
            code: code,
            categoryId: category.id,
            status: true,
          });
          console.log(`  ✅ Created subcategory: ${subCategoryName}`);
          
          // Small delay to ensure unique timestamps
          await new Promise(resolve => setTimeout(resolve, 2));
        } else {
          console.log(`  ⏭️  Subcategory already exists: ${subCategoryName}`);
        }
        subCategoryIndex++;
      }
    }

    console.log("\n🎉 Seeding completed successfully!");
    console.log(
      `Total Categories: ${Object.keys(categorySubcategoryData).length}`
    );
    
    // Count total subcategories
    const totalSubCategories = Object.values(categorySubcategoryData).reduce(
      (sum, subcats) => sum + subcats.length,
      0
    );
    console.log(`Total SubCategories: ${totalSubCategories}`);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    throw error;
  }
}

// Run the seeder
if (require.main === module) {
  require("dotenv").config();
  
  db.sequelize
    .authenticate()
    .then(() => {
      console.log("✅ Database connected for seeding...");
      return seedCategoriesAndSubCategories();
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

module.exports = seedCategoriesAndSubCategories;

