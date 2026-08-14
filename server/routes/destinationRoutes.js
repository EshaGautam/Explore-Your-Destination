import { Router } from "express";

import {
  fetchDestinations,
  fetchDestination,
  fetchDestinationPlaces,
  fetchDestinationCuisines,
  fetchDestinationConnections,
} from "../controllers/destinationControllers.js";

const router = Router();

router.get("/", fetchDestinations);

router.get("/:name", fetchDestination);

router.get("/:name/places", fetchDestinationPlaces);

router.get("/:name/cuisines", fetchDestinationCuisines);

router.get("/:name/connections", fetchDestinationConnections);

export default router;