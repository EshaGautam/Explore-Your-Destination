import neo4j from "neo4j-driver";
import dotenv from "dotenv";

dotenv.config();

const requiredEnv = [
  "COGNODB_URI",
  "COGNODB_USERNAME",
  "COGNODB_PASSWORD",
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USERNAME,
    process.env.COGNODB_PASSWORD
  ),
  {
    maxConnectionLifetime: 3 * 60 * 1000, // 3 minutes (recreates connections to avoid stale/idle socket drops)
    maxConnectionPoolSize: 10,             // Keeps pool small to respect CognoDB free tier connections
    connectionAcquisitionTimeout: 30000    // 30 seconds connection timeout
  }
);

export const verifyDatabaseConnection = async () => {
  await driver.verifyConnectivity();
  console.log("Connected to CognoDB successfully");
};

export default driver;