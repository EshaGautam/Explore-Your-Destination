import {
  getDestinationInterests,
  getDestinationsByInterest,
} from "../services/discoveryServices.js";
import { validateName, validateInterest } from "../utils/validation.js";

export const fetchDestinationInterests = async (req, res) => {
  try {
    const { destination } = req.params;

    if (!validateName(destination)) {
      return res.status(400).json({
        success: false,
        message: "Invalid destination name parameter",
      });
    }

    const interests = await getDestinationInterests(destination);

    res.json({
      success: true,
      data: interests,
    });
  } catch (error) {
    console.error("Failed to fetch interests:", error);

    res.status(503).json({
      success: false,
      message: "Unable to discover interests",
    });
  }
};

export const fetchDestinationsByInterest = async (req, res) => {
  try {
    const { interest } = req.query;

    if (!interest) {
      return res.status(400).json({
        success: false,
        message: "Interest is required",
      });
    }

    if (!validateInterest(interest)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interest vibe parameter",
      });
    }

    const destinations = await getDestinationsByInterest(interest);

    res.json({
      success: true,
      data: destinations,
    });
  } catch (error) {
    console.error("Failed to discover destinations:", error);

    res.status(503).json({
      success: false,
      message: "Unable to discover destinations",
    });
  }
};