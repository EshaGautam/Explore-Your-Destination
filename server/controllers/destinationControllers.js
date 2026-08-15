import {
  getDestinations,
  getDestination,
  getDestinationPlaces,
  getDestinationCuisines,
  getDestinationConnections,
} from "../services/destinationServices.js";
import { validateName } from "../utils/validation.js";

export const fetchDestinations = async (req, res) => {
  try {
    const { search } = req.query;

    if (search && search.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Search query parameter is too long",
      });
    }

    const destinations = await getDestinations(search || "");

    res.json({
      success: true,
      data: destinations,
    });
  } catch (error) {
    console.error("Failed to fetch destinations:", error);

    res.status(503).json({
      success: false,
      message: "Unable to load destinations",
    });
  }
};

export const fetchDestination = async (req, res) => {
  try {
    const { name } = req.params;

    if (!validateName(name)) {
      return res.status(400).json({
        success: false,
        message: "Invalid destination name parameter",
      });
    }

    const destination = await getDestination(name);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    res.json({
      success: true,
      data: destination,
    });
  } catch (error) {
    console.error("Failed to fetch destination:", error);

    res.status(503).json({
      success: false,
      message: "Unable to load destination",
    });
  }
};

export const fetchDestinationPlaces = async (req, res) => {
  try {
    const { name } = req.params;

    if (!validateName(name)) {
      return res.status(400).json({
        success: false,
        message: "Invalid destination name parameter",
      });
    }

    const places = await getDestinationPlaces(name);

    res.json({
      success: true,
      data: places,
    });
  } catch (error) {
    console.error("Failed to fetch places:", error);

    res.status(503).json({
      success: false,
      message: "Unable to load places",
    });
  }
};

export const fetchDestinationCuisines = async (req, res) => {
  try {
    const { name } = req.params;

    if (!validateName(name)) {
      return res.status(400).json({
        success: false,
        message: "Invalid destination name parameter",
      });
    }

    const cuisines = await getDestinationCuisines(name);

    res.json({
      success: true,
      data: cuisines,
    });
  } catch (error) {
    console.error("Failed to fetch cuisines:", error);

    res.status(503).json({
      success: false,
      message: "Unable to load cuisines",
    });
  }
};

export const fetchDestinationConnections = async (req, res) => {
  try {
    const { name } = req.params;

    if (!validateName(name)) {
      return res.status(400).json({
        success: false,
        message: "Invalid destination name parameter",
      });
    }

    const connections = await getDestinationConnections(name);

    res.json({
      success: true,
      data: connections,
    });
  } catch (error) {
    console.error("Failed to fetch connections:", error);

    res.status(503).json({
      success: false,
      message: "Unable to load connections",
    });
  }
};