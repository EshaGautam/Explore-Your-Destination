import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import driver, {
  verifyDatabaseConnection,
} from "./config/database.js";

import destinationRoutes from "./routes/destinationRoutes.js";
import discoveryRoutes from "./routes/discoveryRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    const session = driver.session();

    const result = await session.run(
      `RETURN "Connect Your Journey - CognoDB Connected" AS message`
    );

    await session.close();

    res.json({
      success: true,
      message: result.records[0].get("message"),
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    res.status(503).json({
      success: false,
      message: "Database is currently unavailable",
    });
  }
});

app.use("/api/destinations", destinationRoutes);
app.use("/api/discover", discoveryRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await verifyDatabaseConnection();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to CognoDB:", error.message);
    process.exit(1);
  }
};

startServer();