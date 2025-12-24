// Load environment variables FIRST
require("dotenv").config();

const db = require("../models");
const {
  Country,
  State,
  City,
  Board,
  AcademicYear,
  Emotion,
  Zone,
  Impact,
  Pleasantness,
  Institute,
  Branch,
  School,
  ClassData,
  Division,
  Mood,
} = db;

// Sample data arrays
const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "China",
  "Brazil",
  "Mexico",
  "Spain",
  "Italy",
  "South Korea",
  "Singapore",
  "UAE",
  "Saudi Arabia",
  "South Africa",
  "New Zealand",
  "Switzerland",
];

const indianStates = [
  { name: "Maharashtra", country: "India" },
  { name: "Karnataka", country: "India" },
  { name: "Tamil Nadu", country: "India" },
  { name: "Gujarat", country: "India" },
  { name: "Delhi", country: "India" },
  { name: "Punjab", country: "India" },
  { name: "Rajasthan", country: "India" },
  { name: "West Bengal", country: "India" },
  { name: "Kerala", country: "India" },
  { name: "Telangana", country: "India" },
  { name: "Andhra Pradesh", country: "India" },
  { name: "Uttar Pradesh", country: "India" },
  { name: "Madhya Pradesh", country: "India" },
  { name: "Bihar", country: "India" },
  { name: "Odisha", country: "India" },
];

const usStates = [
  { name: "California", country: "United States" },
  { name: "Texas", country: "United States" },
  { name: "New York", country: "United States" },
  { name: "Florida", country: "United States" },
  { name: "Illinois", country: "United States" },
];

const otherStates = [
  { name: "Ontario", country: "Canada" },
  { name: "Quebec", country: "Canada" },
  { name: "New South Wales", country: "Australia" },
  { name: "Victoria", country: "Australia" },
  { name: "England", country: "United Kingdom" },
  { name: "Scotland", country: "United Kingdom" },
  { name: "Bavaria", country: "Germany" },
  { name: "Ile-de-France", country: "France" },
];

const cities = [
  // Indian Cities
  { name: "Mumbai", state: "Maharashtra", country: "India" },
  { name: "Pune", state: "Maharashtra", country: "India" },
  { name: "Nagpur", state: "Maharashtra", country: "India" },
  { name: "Bangalore", state: "Karnataka", country: "India" },
  { name: "Mysore", state: "Karnataka", country: "India" },
  { name: "Chennai", state: "Tamil Nadu", country: "India" },
  { name: "Coimbatore", state: "Tamil Nadu", country: "India" },
  { name: "Ahmedabad", state: "Gujarat", country: "India" },
  { name: "Surat", state: "Gujarat", country: "India" },
  { name: "New Delhi", state: "Delhi", country: "India" },
  { name: "Chandigarh", state: "Punjab", country: "India" },
  { name: "Jaipur", state: "Rajasthan", country: "India" },
  { name: "Kolkata", state: "West Bengal", country: "India" },
  { name: "Kochi", state: "Kerala", country: "India" },
  { name: "Hyderabad", state: "Telangana", country: "India" },
  { name: "Vijayawada", state: "Andhra Pradesh", country: "India" },
  { name: "Lucknow", state: "Uttar Pradesh", country: "India" },
  { name: "Bhopal", state: "Madhya Pradesh", country: "India" },
  { name: "Patna", state: "Bihar", country: "India" },
  { name: "Bhubaneswar", state: "Odisha", country: "India" },
  // US Cities
  { name: "Los Angeles", state: "California", country: "United States" },
  { name: "San Francisco", state: "California", country: "United States" },
  { name: "Houston", state: "Texas", country: "United States" },
  { name: "Dallas", state: "Texas", country: "United States" },
  { name: "New York City", state: "New York", country: "United States" },
  { name: "Buffalo", state: "New York", country: "United States" },
  { name: "Miami", state: "Florida", country: "United States" },
  { name: "Orlando", state: "Florida", country: "United States" },
  { name: "Chicago", state: "Illinois", country: "United States" },
  // Other Countries
  { name: "Toronto", state: "Ontario", country: "Canada" },
  { name: "Ottawa", state: "Ontario", country: "Canada" },
  { name: "Montreal", state: "Quebec", country: "Canada" },
  { name: "Sydney", state: "New South Wales", country: "Australia" },
  { name: "Melbourne", state: "Victoria", country: "Australia" },
  { name: "London", state: "England", country: "United Kingdom" },
  { name: "Manchester", state: "England", country: "United Kingdom" },
  { name: "Edinburgh", state: "Scotland", country: "United Kingdom" },
  { name: "Munich", state: "Bavaria", country: "Germany" },
  { name: "Paris", state: "Ile-de-France", country: "France" },
];

const boards = [
  { name: "Central Board of Secondary Education", type: "National", email: "cbse@education.gov.in" },
  { name: "Indian Certificate of Secondary Education", type: "National", email: "icse@cisce.org" },
  { name: "Maharashtra State Board", type: "State", email: "msbshse@maharashtra.gov.in" },
  { name: "Karnataka State Board", type: "State", email: "kseeb@karnataka.gov.in" },
  { name: "Tamil Nadu State Board", type: "State", email: "dge@tn.gov.in" },
  { name: "Gujarat State Board", type: "State", email: "gseb@gujarat.gov.in" },
  { name: "Rajasthan State Board", type: "State", email: "bser@rajasthan.gov.in" },
  { name: "West Bengal Board", type: "State", email: "wbbse@wb.gov.in" },
  { name: "Kerala State Board", type: "State", email: "dhsekerala@kerala.gov.in" },
  { name: "Telangana State Board", type: "State", email: "bse.telangana@telangana.gov.in" },
  { name: "Cambridge International", type: "International", email: "info@cambridgeinternational.org" },
  { name: "International Baccalaureate", type: "International", email: "info@ibo.org" },
];

const academicYears = [
  "2021-2022",
  "2022-2023",
  "2023-2024",
  "2024-2025",
  "2025-2026",
  "June 2021 - April 2022",
  "June 2022 - April 2023",
  "June 2023 - April 2024",
  "June 2024 - April 2025",
  "June 2025 - April 2026",
];

const emotions = [
  { name: "Angry", score: 20 },
  { name: "Sad", score: 30 },
  { name: "Anxious", score: 35 },
  { name: "Frustrated", score: 40 },
  { name: "Disappointed", score: 50 },
  { name: "Tired", score: 40 },
  { name: "Excited", score: 85 },
  { name: "Content", score: 60 },
  { name: "Bored", score: 45 },
  { name: "Surprised", score: 60 },
  { name: "Happy", score: 90 },
  { name: "Hopeful", score: 70 },
  { name: "Focused", score: 75 },
  { name: "Thoughtful", score: 70 },
  { name: "Calm", score: 70 },
  { name: "Motivated", score: 80 },
  { name: "Proud", score: 85 },
  { name: "Joyful", score: 95 },
  { name: "Peaceful", score: 65 },
  { name: "Comfortable", score: 65 },
  { name: "Grateful", score: 75 },
  { name: "Touched", score: 70 },
  { name: "Carefree", score: 70 },
  { name: "Serene", score: 65 },
];

const zones = [
  { name: "Green Zone", description: "Calm, focused, happy, ready to learn" },
  { name: "Blue Zone", description: "Sad, tired, sick, bored" },
  { name: "Yellow Zone", description: "Frustrated, worried, silly, excited" },
  { name: "Red Zone", description: "Mad, angry, yelling, hitting" },
  { name: "Orange Zone", description: "Moderate emotional state" },
  { name: "Purple Zone", description: "Extremely high emotional intensity" },
];

// Helper function to get zone description by zone type
function getZoneDescription(zoneType, zones) {
  const zone = zones.find(z => 
    z.name.toLowerCase().includes(zoneType.toLowerCase())
  );
  return zone ? zone.description : "Moderate emotional state";
}

// Helper function to generate random code
function generateCode(prefix, length = 8) {
  const randomNum = Math.floor(Math.random() * 90000000) + 10000000;
  return `${prefix}_${randomNum}`.substring(0, length).toUpperCase();
}

// Seed Countries
async function seedCountries() {
  try {
    console.log("\n🌍 Seeding Countries...");
    let count = 0;
    
    for (const countryName of countries) {
      const existing = await Country.findOne({
        where: { countryName },
      });

      if (!existing) {
        await Country.create({
          countryName,
          status: Math.random() > 0.2, // 80% active
        });
        count++;
        console.log(`  ✅ Created: ${countryName}`);
      }
    }
    
    console.log(`  📊 Created ${count} new countries`);
  } catch (error) {
    console.error("  ❌ Error seeding countries:", error.message);
    throw error;
  }
}

// Seed States
async function seedStates() {
  try {
    console.log("\n🗺️  Seeding States...");
    let count = 0;
    
    const allStates = [...indianStates, ...usStates, ...otherStates];
    
    for (const stateData of allStates) {
      const existing = await State.findOne({
        where: { 
          state: stateData.name,
          country: stateData.country,
        },
      });

      if (!existing) {
        await State.create({
          state: stateData.name,
          country: stateData.country,
          status: Math.random() > 0.2, // 80% active
        });
        count++;
        console.log(`  ✅ Created: ${stateData.name}, ${stateData.country}`);
      }
    }
    
    console.log(`  📊 Created ${count} new states`);
  } catch (error) {
    console.error("  ❌ Error seeding states:", error.message);
    throw error;
  }
}

// Seed Cities
async function seedCities() {
  try {
    console.log("\n🏙️  Seeding Cities...");
    let count = 0;
    
    for (const cityData of cities) {
      const existing = await City.findOne({
        where: {
          city: cityData.name,
          state: cityData.state,
          country: cityData.country,
        },
      });

      if (!existing) {
        await City.create({
          city: cityData.name,
          state: cityData.state,
          country: cityData.country,
          status: Math.random() > 0.2, // 80% active
        });
        count++;
        console.log(`  ✅ Created: ${cityData.name}, ${cityData.state}`);
      }
    }
    
    console.log(`  📊 Created ${count} new cities`);
  } catch (error) {
    console.error("  ❌ Error seeding cities:", error.message);
    throw error;
  }
}

// Seed Boards
async function seedBoards() {
  try {
    console.log("\n📚 Seeding Boards...");
    let count = 0;
    
    for (const boardData of boards) {
      const existing = await Board.findOne({
        where: { name: boardData.name },
      });

      if (!existing) {
        const code = generateCode("BRD");
        await Board.create({
          name: boardData.name,
          code,
          type: boardData.type,
          email: boardData.email,
          status: Math.random() > 0.2, // 80% active
        });
        count++;
        console.log(`  ✅ Created: ${boardData.name}`);
      }
    }
    
    console.log(`  📊 Created ${count} new boards`);
  } catch (error) {
    console.error("  ❌ Error seeding boards:", error.message);
    throw error;
  }
}

// Seed Academic Years
async function seedAcademicYears() {
  try {
    console.log("\n📅 Seeding Academic Years...");
    let count = 0;
    
    for (const year of academicYears) {
      const existing = await AcademicYear.findOne({
        where: { year },
      });

      if (!existing) {
        await AcademicYear.create({
          year,
          status: Math.random() > 0.3, // 70% active
        });
        count++;
        console.log(`  ✅ Created: ${year}`);
      }
    }
    
    console.log(`  📊 Created ${count} new academic years`);
  } catch (error) {
    console.error("  ❌ Error seeding academic years:", error.message);
    throw error;
  }
}

// Seed Emotions
async function seedEmotions() {
  try {
    console.log("\n😊 Seeding Emotions...");
    let count = 0;
    
    for (const emotionData of emotions) {
      const existing = await Emotion.findOne({
        where: { name: emotionData.name },
      });

      if (!existing) {
        const code = generateCode("EMO");
        await Emotion.create({
          name: emotionData.name,
          code,
          score: emotionData.score,
          status: Math.random() > 0.2, // 80% active
        });
        count++;
        console.log(`  ✅ Created: ${emotionData.name} (Score: ${emotionData.score})`);
      }
    }
    
    console.log(`  📊 Created ${count} new emotions`);
  } catch (error) {
    console.error("  ❌ Error seeding emotions:", error.message);
    throw error;
  }
}

// Seed Zones
async function seedZones() {
  try {
    console.log("\n🎯 Seeding Zones...");
    let count = 0;
    
    // Get a random emotion for each zone
    const emotionList = await Emotion.findAll({ limit: 10 });
    
    if (emotionList.length === 0) {
      console.log("  ⚠️  No emotions found. Skipping zones seeding.");
      return;
    }
    
    for (const zoneData of zones) {
      const existing = await Zone.findOne({
        where: { name: zoneData.name },
      });

      if (!existing) {
        const randomEmotion = emotionList[Math.floor(Math.random() * emotionList.length)];
        const code = generateCode("ZNE");
        
        await Zone.create({
          name: zoneData.name,
          code,
          description: zoneData.description,
          emotionId: randomEmotion.id,
          status: Math.random() > 0.2, // 80% active
        });
        count++;
        console.log(`  ✅ Created: ${zoneData.name}`);
      }
    }
    
    console.log(`  📊 Created ${count} new zones`);
  } catch (error) {
    console.error("  ❌ Error seeding zones:", error.message);
    throw error;
  }
}

// Seed Moods
async function seedMoods() {
  try {
    console.log("\n😊 Seeding Moods...");
    let count = 0;
    
    // Get emotions and zones
    const emotions = await Emotion.findAll({ limit: 20 });
    const zones = await Zone.findAll({ limit: 6 });
    
    if (emotions.length === 0) {
      console.log("  ⚠️  No emotions found. Skipping moods seeding.");
      return;
    }
    
    if (zones.length === 0) {
      console.log("  ⚠️  No zones found. Skipping moods seeding.");
      return;
    }

    // Mood data: moodName maps to base emotion with specific zone description
    const moodData = [
      { moodName: "Enraged", emotion: "Angry", zoneDescription: "Feeling extremely angry and out of control. It's like your anger has reached its highest point, and you can't calm down.", zoneType: "Red" },
      { moodName: "Furious", emotion: "Angry", zoneDescription: "Very, very angry. It's a stronger feeling than just being mad or annoyed, almost like an explosive emotion.", zoneType: "Red" },
      { moodName: "Fuming", emotion: "Angry", zoneDescription: "Showing strong anger, almost like smoke coming out of your ears. You're so upset that it's hard to stay calm.", zoneType: "Red" },
      { moodName: "Disgusted", emotion: "Sad", zoneDescription: "Feeling very upset or sickened by something. It's like you can't stand what's happening or what you're experiencing.", zoneType: "Blue" },
      { moodName: "Frightened", emotion: "Anxious", zoneDescription: "Feeling scared or afraid. It's when something makes you feel really uneasy and worried about what might happen.", zoneType: "Yellow" },
      { moodName: "Lonely", emotion: "Sad", zoneDescription: "Feeling sad because you're alone or disconnected from others. It's a deep sense of isolation where you miss having someone around.", zoneType: "Blue" },
      { moodName: "Depressed", emotion: "Sad", zoneDescription: "Feeling very sad for a long time. It's a heavy sadness that seems to stick with you and makes everything seem dull.", zoneType: "Blue" },
      { moodName: "Panicked", emotion: "Anxious", zoneDescription: "Feeling sudden and intense fear or worry. It's when you're overwhelmed and find it hard to think clearly or stay calm.", zoneType: "Yellow" },
      { moodName: "Nervous", emotion: "Anxious", zoneDescription: "Feeling worried or uneasy about something. It's like having butterflies in your stomach because you're anxious about what's coming up.", zoneType: "Yellow" },
      { moodName: "Frustrated", emotion: "Frustrated", zoneDescription: "Feeling upset because things aren't going as planned. It's a mix of annoyance and disappointment when you hit obstacles or problems.", zoneType: "Yellow" },
      { moodName: "Angry", emotion: "Angry", zoneDescription: "Feeling strong displeasure or annoyance. It's when something bothers you a lot and makes you feel upset.", zoneType: "Red" },
      { moodName: "Worried", emotion: "Anxious", zoneDescription: "Feeling anxious or concerned about something that might happen. It's when you're preoccupied with thoughts of potential problems or issues.", zoneType: "Yellow" },
      { moodName: "Miserable", emotion: "Sad", zoneDescription: "Feeling extremely unhappy or uncomfortable. It's a deep sense of unhappiness that makes everything seem worse.", zoneType: "Blue" },
      { moodName: "Discouraged", emotion: "Sad", zoneDescription: "Feeling disheartened or lacking confidence. It's like losing hope or motivation because things aren't going as you hoped.", zoneType: "Blue" },
      { moodName: "Shocked", emotion: "Anxious", zoneDescription: "Feeling surprised or disturbed by something unexpected. It's a sudden, intense reaction to something that catches you off guard.", zoneType: "Yellow" },
      { moodName: "Restless", emotion: "Anxious", zoneDescription: "Feeling unable to relax or stay still. It's like having too much energy or worry, making it hard to find calm or comfort.", zoneType: "Yellow" },
      { moodName: "Irritated", emotion: "Frustrated", zoneDescription: "Feeling annoyed or bothered by something. It's a persistent sense of discomfort or frustration, even if it's not overwhelming.", zoneType: "Yellow" },
      { moodName: "Disappointed", emotion: "Disappointed", zoneDescription: "Feeling sad because something didn't turn out as expected. It's when reality falls short of what you hoped for or anticipated.", zoneType: "Blue" },
      { moodName: "Concerned", emotion: "Anxious", zoneDescription: "Feeling worried about something. It's a mild form of anxiety or care about a situation that's important to you.", zoneType: "Yellow" },
      { moodName: "Tired", emotion: "Tired", zoneDescription: "Feeling like you need rest or sleep. It's when your energy is low, and you might feel drained but not necessarily unhappy.", zoneType: "Blue" },
      { moodName: "Exhausted", emotion: "Tired", zoneDescription: "Feeling extremely tired. It's a state of being so low on energy that you need a lot of rest to recover.", zoneType: "Blue" },
      { moodName: "Hyper", emotion: "Excited", zoneDescription: "Feeling overly energetic and excited. It's like having too much energy to stay still and being really animated.", zoneType: "Yellow" },
      { moodName: "Lively", emotion: "Excited", zoneDescription: "Feeling full of energy and enthusiasm. It's a sense of being excited and active, bringing a lot of spirit to whatever you're doing.", zoneType: "Yellow" },
      { moodName: "Energized", emotion: "Excited", zoneDescription: "Feeling full of energy and ready to go. It's when you feel awake, active, and motivated to take on tasks.", zoneType: "Green" },
      { moodName: "Satisfied", emotion: "Content", zoneDescription: "Feeling pleased with how things are going. It's a sense of contentment and happiness with what you've achieved or have.", zoneType: "Green" },
      { moodName: "Complacent", emotion: "Content", zoneDescription: "Feeling satisfied but maybe a bit too comfortable. It's when you're okay with the way things are and not seeking change or improvement.", zoneType: "Green" },
      { moodName: "Bored", emotion: "Bored", zoneDescription: "Feeling uninterested or restless because nothing is happening. It's a sense of dullness and lack of engagement with what's around you.", zoneType: "Blue" },
      { moodName: "Uneasy", emotion: "Anxious", zoneDescription: "Feeling slightly worried or uncomfortable. It's a mild sense of discomfort or nervousness that makes you feel unsettled.", zoneType: "Yellow" },
      { moodName: "Surprised", emotion: "Surprised", zoneDescription: "Feeling astonished or amazed by something unexpected. It's a reaction to something that catches you off guard in a surprising way.", zoneType: "Yellow" },
      { moodName: "Enthusiastic", emotion: "Excited", zoneDescription: "Feeling excited and eager about something. It's a high level of interest and energy about a topic or activity.", zoneType: "Green" },
      { moodName: "Cheerful", emotion: "Happy", zoneDescription: "Feeling happy and full of joy. It's a bright and positive mood that makes you feel good and spread positivity.", zoneType: "Green" },
      { moodName: "Optimistic", emotion: "Hopeful", zoneDescription: "Feeling hopeful about the future. It's a positive outlook where you believe things will get better, even if there are challenges.", zoneType: "Green" },
      { moodName: "Focused", emotion: "Focused", zoneDescription: "Feeling concentrated and attentive to a task. It's being deeply engaged and determined to achieve something, without distractions.", zoneType: "Green" },
      { moodName: "Thoughtful", emotion: "Thoughtful", zoneDescription: "Feeling considerate and reflective. It's when you carefully think about others' feelings or ideas and act with care.", zoneType: "Green" },
      { moodName: "Relaxed", emotion: "Calm", zoneDescription: "Feeling calm and at ease. It's a state where you're free from stress and worry, and you feel comfortable and serene.", zoneType: "Green" },
      { moodName: "Inspired", emotion: "Excited", zoneDescription: "Feeling motivated and excited by something or someone. It's when you're driven to act or create because you've been deeply moved.", zoneType: "Green" },
      { moodName: "Motivated", emotion: "Motivated", zoneDescription: "Feeling driven to take action or achieve goals. It's a strong desire to pursue your goals and work towards what you want.", zoneType: "Green" },
      { moodName: "Proud", emotion: "Proud", zoneDescription: "Feeling pleased with something you or someone else has done. It's a sense of accomplishment and self-worth that comes from achievement.", zoneType: "Green" },
      { moodName: "Joyful", emotion: "Joyful", zoneDescription: "Feeling great happiness and delight. It's an intense feeling of pleasure and contentment that brightens your day.", zoneType: "Green" },
      { moodName: "Peaceful", emotion: "Peaceful", zoneDescription: "Feeling calm and free from worry. It's a state of tranquility and quiet where you feel relaxed and at ease.", zoneType: "Green" },
      { moodName: "Hopeful", emotion: "Hopeful", zoneDescription: "Feeling optimistic about the future. It's a positive belief that things will improve and that better days are ahead.", zoneType: "Green" },
      { moodName: "Comfortable", emotion: "Comfortable", zoneDescription: "Feeling relaxed and at ease. It's when you're in a state of physical or emotional well-being and feel content.", zoneType: "Green" },
      { moodName: "Exhilarated", emotion: "Excited", zoneDescription: "Feeling extremely happy and excited. It's an intense and thrilling sense of joy and energy.", zoneType: "Green" },
      { moodName: "Thrilled", emotion: "Excited", zoneDescription: "Feeling very excited and happy. It's a high level of joy and enthusiasm about something exciting.", zoneType: "Green" },
      { moodName: "Blissful", emotion: "Joyful", zoneDescription: "Feeling perfect happiness and contentment. It's an overwhelming sense of joy and peace that feels just right.", zoneType: "Green" },
      { moodName: "Grateful", emotion: "Grateful", zoneDescription: "Feeling thankful for something. It's recognizing and appreciating the good things in your life and feeling appreciative.", zoneType: "Green" },
      { moodName: "Touched", emotion: "Touched", zoneDescription: "Feeling emotionally moved or affected by something. It's a deep sense of appreciation or warmth that impacts you deeply.", zoneType: "Green" },
      { moodName: "Carefree", emotion: "Carefree", zoneDescription: "Feeling relaxed and without worries. It's a state of lightheartedness where you don't have any major concerns.", zoneType: "Green" },
      { moodName: "Serene", emotion: "Serene", zoneDescription: "Feeling calm and peaceful. It's a deep sense of tranquility and stillness where you feel completely at ease.", zoneType: "Green" },
    ];

    // Create moods with format: "Mood Name - Zone Description"
    for (const moodInfo of moodData) {
      // Find emotion by name (case-insensitive) - this is the base emotion to link
      const emotion = emotions.find(e => 
        e.name.toLowerCase() === moodInfo.emotion.toLowerCase()
      );
      
      if (!emotion) {
        console.log(`  ⚠️  Emotion "${moodInfo.emotion}" not found. Skipping mood.`);
        continue;
      }

      // Find zone by type (Green, Blue, Yellow, Red, etc.)
      let zone = zones.find(z => 
        z.name.toLowerCase().includes(moodInfo.zoneType.toLowerCase())
      );
      
      // Fallback to first zone if specific zone type not found
      if (!zone) {
        zone = zones[0];
      }

      // Create mood name in format: "Mood Name - Zone Description"
      const moodName = `${moodInfo.moodName} - ${moodInfo.zoneDescription}`;
      
      const existing = await Mood.findOne({
        where: { name: moodName },
      });

      if (!existing) {
        const code = generateCode("MOOD", 12);
        
        await Mood.create({
          name: moodName,
          code,
          emotionId: emotion.id,
          zoneId: zone.id,
          status: Math.random() > 0.2, // 80% active
        });
        count++;
        console.log(`  ✅ Created: ${moodName}`);
      }
    }
    
    console.log(`  📊 Created ${count} new moods`);
  } catch (error) {
    console.error("  ❌ Error seeding moods:", error.message);
    throw error;
  }
}

// Seed Impacts
async function seedImpacts() {
  try {
    console.log("\n⚡ Seeding Impacts...");
    let count = 0;
    
    const impactValues = [1, 2, 3, 4, 5];
    
    for (const value of impactValues) {
      const existing = await Impact.findOne({
        where: { value },
      });

      if (!existing) {
        await Impact.create({
          value,
          status: true, // All impacts are active
        });
        count++;
        console.log(`  ✅ Created: Impact Value ${value}`);
      }
    }
    
    console.log(`  📊 Created ${count} new impacts`);
  } catch (error) {
    console.error("  ❌ Error seeding impacts:", error.message);
    throw error;
  }
}

// Seed Pleasantness
async function seedPleasantness() {
  try {
    console.log("\n😌 Seeding Pleasantness...");
    let count = 0;
    
    const pleasantnessValues = [1, 2, 3, 4, 5];
    
    for (const value of pleasantnessValues) {
      const existing = await Pleasantness.findOne({
        where: { value },
      });

      if (!existing) {
        await Pleasantness.create({
          value,
          status: true, // All pleasantness values are active
        });
        count++;
        console.log(`  ✅ Created: Pleasantness Value ${value}`);
      }
    }
    
    console.log(`  📊 Created ${count} new pleasantness values`);
  } catch (error) {
    console.error("  ❌ Error seeding pleasantness:", error.message);
    throw error;
  }
}

// Helper function to generate random phone number
function generatePhoneNumber() {
  const prefix = Math.floor(Math.random() * 9000) + 1000;
  const suffix = Math.floor(Math.random() * 9000000) + 1000000;
  return `${prefix}${suffix}`;
}

// Helper function to generate random pincode
function generatePincode() {
  return Math.floor(Math.random() * 900000) + 100000;
}

// Helper function to generate email
function generateEmail(domain, name) {
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${cleanName}@${domain}`;
}

// Seed Institutes
async function seedInstitutes() {
  try {
    console.log("\n🏛️  Seeding Institutes...");
    let count = 0;
    
    // Get cities and states to associate with institutes
    const cities = await City.findAll({ limit: 20 });
    const states = await State.findAll({ limit: 28 });
    
    if (cities.length === 0) {
      console.log("  ⚠️  No cities found. Skipping institutes seeding.");
      return;
    }

    const instituteNames = [
      "Global Education Foundation",
      "Progressive Learning Institute",
      "Excellence Academy",
      "Modern Education Society",
      "Bright Minds Institute",
      "Knowledge Hub Academy",
      "Elite Educational Institute",
      "Future Leaders Academy",
      "Innovation Learning Center",
      "Prestige Education Group",
      "Stars Academy",
      "Wisdom Institute",
      "Success Education Foundation",
      "Heritage Learning Academy",
      "New Age Education Institute",
    ];

    for (let i = 0; i < Math.min(instituteNames.length, cities.length); i++) {
      const city = cities[i];
      const instituteName = instituteNames[i];
      
      const existing = await Institute.findOne({
        where: { name: instituteName },
      });

      if (!existing) {
        // Find state by matching state name from city
        const state = states.find(s => s.state === city.state);
        
        if (state) {
          const code = generateCode("INST", 12);
          const addressPrefixes = ["Near", "Behind", "Opposite"];
          const landmarks = ["City Center", "Railway Station", "Bus Stand", "Market", "Park"];
          const addressPrefix = addressPrefixes[Math.floor(Math.random() * addressPrefixes.length)];
          const landmark = landmarks[Math.floor(Math.random() * landmarks.length)];
          
          await Institute.create({
            name: instituteName,
            code,
            addressLine1: `${addressPrefix} ${landmark}`,
            addressLine2: `${city.city}`,
            stateId: state.id,
            cityId: city.id,
            pinCode: generatePincode().toString(),
            phoneNumber: generatePhoneNumber(),
            telephoneNumber: Math.random() > 0.5 ? generatePhoneNumber() : null,
            email: generateEmail("institute.edu", instituteName),
            website: Math.random() > 0.3 ? `www.${instituteName.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu` : null,
            status: Math.random() > 0.2, // 80% active
          });
          count++;
          console.log(`  ✅ Created: ${instituteName}`);
        }
      }
    }
    
    console.log(`  📊 Created ${count} new institutes`);
  } catch (error) {
    console.error("  ❌ Error seeding institutes:", error.message);
    throw error;
  }
}

// Seed Branches
async function seedBranches() {
  try {
    console.log("\n🏢 Seeding Branches...");
    let count = 0;
    
    // Get institutes, cities, and states
    const institutes = await Institute.findAll({ limit: 15 });
    const cities = await City.findAll({ limit: 30 });
    const states = await State.findAll({ limit: 28 });
    
    if (institutes.length === 0) {
      console.log("  ⚠️  No institutes found. Skipping branches seeding.");
      return;
    }
    
    if (cities.length === 0) {
      console.log("  ⚠️  No cities found. Skipping branches seeding.");
      return;
    }

    const branchSuffixes = [
      "Main Branch",
      "North Branch",
      "South Branch",
      "East Branch",
      "West Branch",
      "Central Branch",
      "City Branch",
      "Downtown Branch",
    ];

    // Create 2-3 branches per institute
    for (const institute of institutes) {
      const numBranches = Math.floor(Math.random() * 2) + 2; // 2-3 branches
      const usedCities = new Set();
      
      // Get institute's state
      const instituteState = states.find(s => s.id === institute.stateId);
      
      for (let i = 0; i < numBranches && i < branchSuffixes.length; i++) {
        // Find a city in the same state as institute or random city
        let city = cities.find(c => c.state === instituteState?.state && !usedCities.has(c.id));
        if (!city) {
          city = cities[Math.floor(Math.random() * cities.length)];
        }
        
        if (city) {
          // Find state for the city
          const cityState = states.find(s => s.state === city.state);
          
          if (cityState) {
            const branchName = `${institute.name} - ${branchSuffixes[i]}`;
            const existing = await Branch.findOne({
              where: { name: branchName },
            });

            if (!existing) {
              const code = generateCode("BRCH", 12);
              
              await Branch.create({
                name: branchName,
                code,
                instituteName: institute.name,
                instituteCode: institute.code,
                address1: `${city.city} Branch Office`,
                address2: `Near ${city.city} City Center`,
                stateId: cityState.id,
                cityId: city.id,
                pincode: generatePincode().toString(),
                phone: generatePhoneNumber(),
                telephone: Math.random() > 0.5 ? generatePhoneNumber() : null,
                email: generateEmail("branch.edu", branchName),
                website: Math.random() > 0.4 ? `www.${branchName.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu` : null,
                status: Math.random() > 0.2, // 80% active
              });
              count++;
              console.log(`  ✅ Created: ${branchName}`);
              usedCities.add(city.id);
            }
          }
        }
      }
    }
    
    console.log(`  📊 Created ${count} new branches`);
  } catch (error) {
    console.error("  ❌ Error seeding branches:", error.message);
    throw error;
  }
}

// Seed Schools
async function seedSchools() {
  try {
    console.log("\n🏫 Seeding Schools...");
    let count = 0;
    
    // Get branches, cities, states, and boards
    const branches = await Branch.findAll({ limit: 30 });
    const cities = await City.findAll({ limit: 40 });
    const states = await State.findAll({ limit: 28 });
    const boards = await Board.findAll({ limit: 12 });
    
    if (branches.length === 0) {
      console.log("  ⚠️  No branches found. Skipping schools seeding.");
      return;
    }
    
    if (cities.length === 0) {
      console.log("  ⚠️  No cities found. Skipping schools seeding.");
      return;
    }
    
    if (boards.length === 0) {
      console.log("  ⚠️  No boards found. Skipping schools seeding.");
      return;
    }

    const schoolTypes = ["Primary", "Secondary", "Higher Secondary", "Composite", "International"];
    const schoolNames = [
      "Sunshine Primary School",
      "Greenwood High School",
      "Riverside Secondary School",
      "Hilltop International School",
      "Valley View School",
      "Oakwood Academy",
      "Maple Leaf School",
      "Cedar Heights School",
      "Pine Grove School",
      "Elmwood School",
      "Ashford Academy",
      "Brookside School",
      "Lakeside High School",
      "Mountain View School",
      "Ocean Breeze Academy",
    ];

    // Create schools for each branch (1-2 schools per branch)
    for (const branch of branches) {
      const numSchools = Math.floor(Math.random() * 2) + 1; // 1-2 schools
      const schoolName = schoolNames[Math.floor(Math.random() * schoolNames.length)];
      const city = cities.find(c => c.id === branch.cityId) || cities[Math.floor(Math.random() * cities.length)];
      
      if (city) {
        // Find state for the city
        const cityState = states.find(s => s.state === city.state);
        
        if (cityState) {
          for (let i = 0; i < numSchools; i++) {
            const schoolNameWithBranch = i === 0 ? schoolName : `${schoolName} - Branch ${i + 1}`;
            const existing = await School.findOne({
              where: { name: schoolNameWithBranch, branchCode: branch.code },
            });

            if (!existing) {
              const code = generateCode("SCH", 12);
              const schoolType = schoolTypes[Math.floor(Math.random() * schoolTypes.length)];
              
              await School.create({
                name: schoolNameWithBranch,
                code,
                instituteName: branch.instituteName,
                instituteCode: branch.instituteCode,
                branchName: branch.name,
                branchCode: branch.code,
                address1: `${city.city} Campus`,
                address2: `Near ${city.city} Educational Hub`,
                stateId: cityState.id,
                cityId: city.id,
                pincode: generatePincode().toString(),
                schoolType,
                phone: generatePhoneNumber(),
                email: generateEmail("school.edu", schoolNameWithBranch),
                telephone: Math.random() > 0.5 ? generatePhoneNumber() : null,
                website: Math.random() > 0.4 ? `www.${schoolNameWithBranch.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu` : null,
                status: Math.random() > 0.2, // 80% active
              });
              count++;
              console.log(`  ✅ Created: ${schoolNameWithBranch}`);
            }
          }
        }
      }
    }
    
    console.log(`  📊 Created ${count} new schools`);
  } catch (error) {
    console.error("  ❌ Error seeding schools:", error.message);
    throw error;
  }
}

// Seed Classes
async function seedClasses() {
  try {
    console.log("\n📖 Seeding Classes...");
    let count = 0;
    
    // Get schools
    const schools = await School.findAll({ limit: 50 });
    
    if (schools.length === 0) {
      console.log("  ⚠️  No schools found. Skipping classes seeding.");
      return;
    }

    const classNames = [
      "Nursery", "LKG", "UKG",
      "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
      "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10",
      "Grade 11", "Grade 12",
    ];

    // Create classes for each school (10-15 classes per school)
    for (const school of schools) {
      const numClasses = Math.floor(Math.random() * 6) + 10; // 10-15 classes
      const selectedClasses = classNames.slice(0, Math.min(numClasses, classNames.length));
      
      for (const className of selectedClasses) {
        const existing = await ClassData.findOne({
          where: { 
            name: className,
            school: school.name,
            schoolCode: school.code,
          },
        });

        if (!existing) {
          const code = generateCode("CLS", 10);
          
          await ClassData.create({
            name: className,
            code,
            school: school.name,
            schoolCode: school.code,
            status: Math.random() > 0.15, // 85% active
          });
          count++;
          console.log(`  ✅ Created: ${className} - ${school.name}`);
        }
      }
    }
    
    console.log(`  📊 Created ${count} new classes`);
  } catch (error) {
    console.error("  ❌ Error seeding classes:", error.message);
    throw error;
  }
}

// Seed Divisions
async function seedDivisions() {
  try {
    console.log("\n📚 Seeding Divisions...");
    let count = 0;
    
    // Get classes
    const classes = await ClassData.findAll({ limit: 200 });
    
    if (classes.length === 0) {
      console.log("  ⚠️  No classes found. Skipping divisions seeding.");
      return;
    }

    const divisionNames = ["A", "B", "C", "D", "E"];

    // Create divisions for each class (2-5 divisions per class)
    for (const classItem of classes) {
      const numDivisions = Math.floor(Math.random() * 4) + 2; // 2-5 divisions
      const selectedDivisions = divisionNames.slice(0, Math.min(numDivisions, divisionNames.length));
      
      for (const divisionName of selectedDivisions) {
        const fullDivisionName = `${classItem.name} - ${divisionName}`;
        const existing = await Division.findOne({
          where: { 
            name: fullDivisionName,
            class: classItem.name,
            school: classItem.school,
          },
        });

        if (!existing) {
          const code = generateCode("DIV", 10);
          
          await Division.create({
            name: fullDivisionName,
            code,
            class: classItem.name,
            school: classItem.school,
            classCode: classItem.code,
            schoolCode: classItem.schoolCode,
            status: Math.random() > 0.15, // 85% active
          });
          count++;
          console.log(`  ✅ Created: ${fullDivisionName} - ${classItem.school}`);
        }
      }
    }
    
    console.log(`  📊 Created ${count} new divisions`);
  } catch (error) {
    console.error("  ❌ Error seeding divisions:", error.message);
    throw error;
  }
}

// Main seeding function
async function seedAllMasterData() {
  try {
    console.log("🚀 Starting Master Data Seeding...");
    console.log("=".repeat(60));

    // Authenticate database connection
    await db.sequelize.authenticate();
    console.log("✅ Database connected successfully!\n");

    // Seed in order (respecting dependencies)
    await seedCountries();
    await seedStates();
    await seedCities();
    await seedBoards();
    await seedAcademicYears();
    await seedEmotions();
    await seedZones(); // Zones depend on Emotions
    await seedImpacts();
    await seedPleasantness();
    await seedMoods(); // Moods depend on Emotions and Zones (must be after emotions and zones)
    await seedInstitutes(); // Institutes depend on States and Cities
    await seedBranches(); // Branches depend on Institutes, States, and Cities
    await seedSchools(); // Schools depend on Branches, Institutes, States, Cities, and Boards
    await seedClasses(); // Classes depend on Schools
    await seedDivisions(); // Divisions depend on Classes and Schools

    console.log("\n" + "=".repeat(60));
    console.log("🎉 Master Data Seeding Completed Successfully!");
    console.log("=".repeat(60));
    
    // Print summary
    const countryCount = await Country.count();
    const stateCount = await State.count();
    const cityCount = await City.count();
    const boardCount = await Board.count();
    const academicYearCount = await AcademicYear.count();
    const emotionCount = await Emotion.count();
    const zoneCount = await Zone.count();
    const moodCount = await Mood.count();
    const impactCount = await Impact.count();
    const pleasantnessCount = await Pleasantness.count();
    const instituteCount = await Institute.count();
    const branchCount = await Branch.count();
    const schoolCount = await School.count();
    const classCount = await ClassData.count();
    const divisionCount = await Division.count();
    
    console.log("\n📊 Database Summary:");
    console.log(`  🌍 Countries: ${countryCount}`);
    console.log(`  🗺️  States: ${stateCount}`);
    console.log(`  🏙️  Cities: ${cityCount}`);
    console.log(`  📚 Boards: ${boardCount}`);
    console.log(`  📅 Academic Years: ${academicYearCount}`);
    console.log(`  😊 Emotions: ${emotionCount}`);
    console.log(`  🎯 Zones: ${zoneCount}`);
    console.log(`  😊 Moods: ${moodCount}`);
    console.log(`  ⚡ Impacts: ${impactCount}`);
    console.log(`  😌 Pleasantness: ${pleasantnessCount}`);
    console.log(`  🏛️  Institutes: ${instituteCount}`);
    console.log(`  🏢 Branches: ${branchCount}`);
    console.log(`  🏫 Schools: ${schoolCount}`);
    console.log(`  📖 Classes: ${classCount}`);
    console.log(`  📚 Divisions: ${divisionCount}`);
    
  } catch (error) {
    console.error("\n❌ Error during seeding:", error);
    throw error;
  }
}

// Run the seeder if executed directly
if (require.main === module) {
  seedAllMasterData()
    .then(() => {
      console.log("\n✅ Seeding process completed. Exiting...");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n❌ Seeding failed:", error.message);
      process.exit(1);
    });
}

module.exports = seedAllMasterData;

