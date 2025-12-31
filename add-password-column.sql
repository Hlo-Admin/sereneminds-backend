-- Migration to add password column to Students table
-- Run this SQL command directly in your database if sequelize migration fails

ALTER TABLE "Students" 
ADD COLUMN IF NOT EXISTS "password" VARCHAR(255);

-- If the column already exists, this will do nothing
-- If you need to update existing students, you can set a default password:
-- UPDATE "Students" SET "password" = NULL WHERE "password" IS NULL;

