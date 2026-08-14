import driver from "../config/database.js";
import {
  GET_DESTINATIONS,
  GET_DESTINATION,
  GET_DESTINATION_PLACES,
} from "../queries/destinationQueries.js";

const executeQuery = async (query, params = {}) => {
  if (!driver) {
    throw new Error("Database driver is not initialized. Please configure CognoDB environment variables.");
  }
  const session = driver.session();

  try {
    const result = await session.run(query, params);

    return result.records;
  } finally {
    await session.close();
  }
};

export const getDestinations = async () => {
  const records = await executeQuery(GET_DESTINATIONS);

  return records.map((record) => ({
    name: record.get("name"),
    state: record.get("state"),
    country: record.get("country"),
    description: record.get("description"),
  }));
};

export const getDestination = async (name) => {
  const records = await executeQuery(GET_DESTINATION, { name });

  if (!records.length) {
    return null;
  }

  const record = records[0];

  return {
    name: record.get("name"),
    state: record.get("state"),
    country: record.get("country"),
    description: record.get("description"),
  };
};

export const getDestinationPlaces = async (name) => {
  const records = await executeQuery(GET_DESTINATION_PLACES, {
    name,
  });

  return records.map((record) => ({
    name: record.get("name"),
    type: record.get("type"),
  }));
};