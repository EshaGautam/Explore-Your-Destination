import { Router } from "express";

import {
  fetchDestinations,
  fetchDestination,
  fetchDestinationPlaces,
} from "../controllers/destinationControllers.js";

const router = Router();

router.get("/", fetchDestinations);

router.get("/:name", fetchDestination);

router.get("/:name/places", fetchDestinationPlaces);

export default router;