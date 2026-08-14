import dotenv from "dotenv";
import driver from "../config/database.js";

dotenv.config();

const setupDatabase = async () => {
  const session = driver.session();

  try {
    console.log("🔧 Setting up CognoDB...");

    await session.run(`
      CREATE CONSTRAINT destination_name_unique IF NOT EXISTS
      FOR (d:Destination)
      REQUIRE d.name IS UNIQUE
    `);

    await session.run(`
      CREATE CONSTRAINT place_name_unique IF NOT EXISTS
      FOR (p:Place)
      REQUIRE p.name IS UNIQUE
    `);

    await session.run(`
      CREATE CONSTRAINT experience_name_unique IF NOT EXISTS
      FOR (e:Experience)
      REQUIRE e.name IS UNIQUE
    `);

    await session.run(`
      CREATE CONSTRAINT interest_name_unique IF NOT EXISTS
      FOR (i:Interest)
      REQUIRE i.name IS UNIQUE
    `);

    await session.run(`
      CREATE CONSTRAINT cuisine_name_unique IF NOT EXISTS
      FOR (c:Cuisine)
      REQUIRE c.name IS UNIQUE
    `);

    console.log("✅ Database constraints created successfully");
  } catch (error) {
    console.error("❌ Database setup failed:", error.message);
  } finally {
    await session.close();
    await driver.close();
  }
};

setupDatabase();