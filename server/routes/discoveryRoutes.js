import { Router } from "express";

import {
  fetchDestinationInterests,
  fetchDestinationsByInterest,
} from "../controllers/discoveryControllers.js";

const router = Router();

router.get(
  "/interests/:destination",
  fetchDestinationInterests
);

router.get(
  "/destinations",
  fetchDestinationsByInterest
);

export default router;