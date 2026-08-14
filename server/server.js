import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import driver, {
  verifyDatabaseConnection,
} from "./config/database.js";

import destinationRoutes from "./routes/destinationRoutes.js";
import discoveryRoutes from "./routes/discoveryRoutes.js";

dotenv.config();

const app = express();

// Use Helmet for secure HTTP headers
app.use(helmet());

// Dynamic CORS configurations
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173", "http://127.0.0.1:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS origin not allowed"), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Rate Limiter to prevent brute force and DoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per 15 minutes
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

// Request body size limit
app.use(express.json({ limit: "100kb" }));

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