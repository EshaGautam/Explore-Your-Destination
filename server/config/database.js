import neo4j from "neo4j-driver";
import dotenv from "dotenv";

dotenv.config();

const driver = (process.env.COGNODB_URI)
  ? neo4j.driver(
      process.env.COGNODB_URI,
      neo4j.auth.basic(
        process.env.COGNODB_USERNAME || "cognodb",
        process.env.COGNODB_PASSWORD || ""
      ),
      {
        maxConnectionLifetime: 3 * 60 * 1000, // 3 minutes (recreates connections to avoid stale/idle socket drops)
        maxConnectionPoolSize: 10,             // Keeps pool small to respect CognoDB free tier connections
        connectionAcquisitionTimeout: 30000    // 30 seconds connection timeout
      }
    )
  : null;

export const verifyDatabaseConnection = async () => {
  console.log("🔍 Checking CognoDB environment configuration presence...");
  const config = {
    uriPresent: !!process.env.COGNODB_URI,
    usernamePresent: !!process.env.COGNODB_USERNAME,
    passwordPresent: !!process.env.COGNODB_PASSWORD
  };
  console.log(config);

  if (!driver) {
    throw new Error("Missing required CognoDB environment variables. Database connection cannot be verified.");
  }

  await driver.verifyConnectivity();
  console.log("Connected to CognoDB successfully");
};

export default driver;