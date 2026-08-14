import driver from "../config/database.js";

import {
  GET_DESTINATION_INTERESTS,
  GET_DESTINATIONS_BY_INTEREST,
} from "../queries/discoveryQueries.js";

const executeQuery = async (query, params = {}) => {
  const session = driver.session();

  try {
    const result = await session.run(query, params);

    return result.records;
  } finally {
    await session.close();
  }
};

export const getDestinationInterests = async (destination) => {
  const records = await executeQuery(
    GET_DESTINATION_INTERESTS,
    { destination }
  );

  return records.map((record) => record.get("interest"));
};

export const getDestinationsByInterest = async (interest) => {
  const records = await executeQuery(
    GET_DESTINATIONS_BY_INTEREST,
    { interest }
  );

  return records.map((record) => ({
    name: record.get("destination"),
    state: record.get("state"),
    country: record.get("country"),
  }));
};