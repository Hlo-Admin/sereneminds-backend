# Master Data Seeders

This document explains how to populate your PostgreSQL database with random/default master data.

## Available Seeders

### 1. Master Data Seeder (`seed-master-data.js`)
This seeder populates all master data tables with realistic random data:

- **Countries**: 20 countries (India, USA, UK, Canada, Australia, etc.)
- **States**: Multiple states for each country
- **Cities**: Cities mapped to their respective states and countries
- **Boards**: Educational boards (CBSE, ICSE, State Boards, International)
- **Academic Years**: Academic year ranges (2021-2026)
- **Emotions**: 20 common emotions with scores (Happy, Sad, Angry, etc.)
- **Zones**: Emotional zones (Green, Blue, Yellow, Red zones)
- **Moods**: 25 mood combinations linking emotions with zones
- **Impacts**: Impact values (1-5)
- **Pleasantness**: Pleasantness values (1-5)
- **Institutes**: 15 educational institutes
- **Branches**: 2-3 branches per institute (30+ branches)
- **Schools**: 1-2 schools per branch (50+ schools)
- **Classes**: 10-15 classes per school (500+ classes)
- **Divisions**: 2-5 divisions per class (1000+ divisions)

### 2. Categories & SubCategories Seeder (`seed-categories-subcategories.js`)
Populates categories and subcategories for mood logging.

### 3. Student Seeder (`seed-default-student.js`)
Creates a default student user for testing.

## How to Run Seeders

### Prerequisites
1. Make sure your database is running (PostgreSQL)
2. Ensure your `.env` file is configured with database credentials
3. Run migrations first to create tables:
   ```bash
   npx sequelize-cli db:migrate
   ```

### Run Individual Seeders

#### Seed Master Data Only
```bash
npm run seed:master
```

#### Seed Categories & SubCategories
```bash
npm run seed:categories
```

#### Seed Default Student
```bash
npm run seed:student
```

### Run All Seeders
```bash
npm run seed:all
```

### Run Seeders Directly with Node
```bash
# Master data
node seeders/seed-master-data.js

# Categories
node seeders/seed-categories-subcategories.js

# Student
node seeders/seed-default-student.js
```

## What Gets Created

When you run `npm run seed:master`, you'll get:

- **20 Countries** with realistic names
- **28 States** distributed across countries
- **40+ Cities** mapped to their states
- **12 Educational Boards** (National, State, International)
- **10 Academic Years**
- **20 Emotions** with associated scores
- **6 Emotional Zones** linked to emotions
- **25 Moods** (combinations of emotions and zones)
- **5 Impact Values** (1-5)
- **5 Pleasantness Values** (1-5)
- **15+ Institutes**
- **30+ Branches**
- **50+ Schools**
- **500+ Classes**
- **1000+ Divisions**

## Data in Database

After running the seeders, you can verify the data in pgAdmin:

1. Open pgAdmin
2. Connect to your database
3. Navigate to your database schema
4. Check the tables:
   - `Countries`
   - `States`
   - `Cities`
   - `Boards`
   - `AcademicYears`
   - `Emotions`
   - `Zones`
   - `Impacts`
   - `Pleasantnesses`
   - `Institutes`
   - `Branches`
   - `Schools`
   - `Classes`
   - `Divisions`

## Notes

- **Idempotent**: Seeders check if data already exists before creating, so you can run them multiple times safely
- **Random Status**: Most records get random active/inactive status (80% active)
- **Auto-generated Codes**: Boards, Emotions, and Zones get auto-generated unique codes
- **Relationships**: Zones are linked to Emotions, Cities to States and Countries, etc.

## Troubleshooting

### Database Connection Error
- Check your `.env` file has correct database credentials
- Ensure PostgreSQL is running
- Verify database name exists

### Foreign Key Errors
- Make sure migrations have been run
- Run seeders in order (countries → states → cities)

### Duplicate Entry Errors
- Seeders check for existing data, but if you get duplicate errors, clear tables and re-run

## Example Output

```
🚀 Starting Master Data Seeding...
============================================================
✅ Database connected successfully!

🌍 Seeding Countries...
  ✅ Created: India
  ✅ Created: United States
  ...
  📊 Created 20 new countries

🗺️  Seeding States...
  ✅ Created: Maharashtra, India
  ✅ Created: California, United States
  ...
  📊 Created 28 new states

🏙️  Seeding Cities...
  ✅ Created: Mumbai, Maharashtra
  ✅ Created: Los Angeles, California
  ...
  📊 Created 40 new cities

...

🎉 Master Data Seeding Completed Successfully!
============================================================

📊 Database Summary:
  🌍 Countries: 20
  🗺️  States: 28
  🏙️  Cities: 40
  📚 Boards: 12
  📅 Academic Years: 10
  😊 Emotions: 20
  🎯 Zones: 6
  😊 Moods: 25
  ⚡ Impacts: 5
  😌 Pleasantness: 5
  🏛️  Institutes: 15
  🏢 Branches: 30
  🏫 Schools: 50
  📖 Classes: 500
  📚 Divisions: 1000
```

