import dotenv from "dotenv";
import driver from "../config/database.js";

dotenv.config();

const verifyDatabase = async () => {
  const session = driver.session();

  try {
    console.log("\n🔍 Verifying Connect Your Journey graph...\n");

    const checks = [
      {
        name: "Destinations",
        query: `MATCH (d:Destination) RETURN count(d) AS count`,
      },
      {
        name: "Places",
        query: `MATCH (p:Place) RETURN count(p) AS count`,
      },
      {
        name: "Experiences",
        query: `MATCH (e:Experience) RETURN count(e) AS count`,
      },
      {
        name: "Interests",
        query: `MATCH (i:Interest) RETURN count(i) AS count`,
      },
      {
        name: "Cuisines",
        query: `MATCH (c:Cuisine) RETURN count(c) AS count`,
      },
      {
        name: "Relationships",
        query: `MATCH ()-[r]->() RETURN count(r) AS count`,
      },
    ];

    for (const check of checks) {
      const result = await session.run(check.query);
      const count = result.records[0].get("count").toNumber();

      console.log(`✓ ${check.name}: ${count}`);
    }

    console.log("\n🎉 Graph verification complete!");
  } catch (error) {
    console.error("❌ Verification failed:", error.message);
  } finally {
    await session.close();
    await driver.close();
  }
};

verifyDatabase();