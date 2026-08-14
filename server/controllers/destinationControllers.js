import {
  getDestinations,
  getDestination,
  getDestinationPlaces,
} from "../services/destinationServices.js";

export const fetchDestinations = async (req, res) => {
  try {
    const destinations = await getDestinations();

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