import {
  getDestinationInterests,
  getDestinationsByInterest,
} from "../services/discoveryServices.js";

export const fetchDestinationInterests = async (req, res) => {
  try {
    const { destination } = req.params;

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