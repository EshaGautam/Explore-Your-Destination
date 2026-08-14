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
      // Allow requests with no origin (like postman, curl, or mobile apps)
      if (!origin) return callback(null, true);

      // Automatically allow local/development origins on any port
      if (
        origin.startsWith("http://localhost:") ||
        origin.startsWith("http://127.0.0.1:") ||
        origin.startsWith("http://192.168.")
      ) {
        return callback(null, true);
      }

      // Automatically allow Vercel deployment origins (production & preview URLs)
      if (origin.endsWith(".vercel.app") || origin.endsWith(".now.sh")) {
        return callback(null, true);
      }

      // Check configured allowed origins
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }

      return callback(new Error("CORS origin not allowed"), false);
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
    if (!driver) {
      return res.status(503).json({
        success: false,
        message: "Database driver is not initialized. Please check environment variables.",
      });
    }

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

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Explore Your Destination API is running",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);

    // Asynchronously verify connection to prevent boot crashes when DB is sleeping
    verifyDatabaseConnection().catch((error) => {
      console.error("⚠️ Failed to connect to CognoDB on startup:", error.message);
      console.log("ℹ️ Server remains online to serve static routes and health checks.");
    });
  });
};

startServer();