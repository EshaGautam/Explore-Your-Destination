import dotenv from "dotenv";
import driver from "../config/database.js";

dotenv.config();

const destinations = [
  { name: "Jaipur", state: "Rajasthan", country: "India", description: "Known for historic forts, palaces, architecture and cultural experiences." },
  { name: "Delhi", state: "Delhi", country: "India", description: "A historic capital known for monuments, culture, food and diverse experiences." },
  { name: "Agra", state: "Uttar Pradesh", country: "India", description: "A historic destination known for Mughal architecture and heritage landmarks." },
  { name: "Udaipur", state: "Rajasthan", country: "India", description: "Known for lakes, palaces, heritage architecture and cultural experiences." },
  { name: "Goa", state: "Goa", country: "India", description: "A coastal destination known for beaches, heritage, food and outdoor experiences." },
  { name: "Mumbai", state: "Maharashtra", country: "India", description: "A major coastal city known for architecture, culture, food and iconic landmarks." },
  { name: "Varanasi", state: "Uttar Pradesh", country: "India", description: "A historic spiritual destination known for ghats, temples and cultural experiences." },
  { name: "Rishikesh", state: "Uttarakhand", country: "India", description: "Known for spirituality, riverside experiences and adventure activities." },
  { name: "Amritsar", state: "Punjab", country: "India", description: "Known for spiritual heritage, history, culture and Punjabi cuisine." },
  { name: "Kochi", state: "Kerala", country: "India", description: "A coastal destination known for heritage, art, culture and South Indian cuisine." },
];

const places = [
  { name: "Amer Fort", destination: "Jaipur", type: "Historical Site" },
  { name: "City Palace Jaipur", destination: "Jaipur", type: "Palace" },
  { name: "Hawa Mahal", destination: "Jaipur", type: "Monument" },
  { name: "Jantar Mantar Jaipur", destination: "Jaipur", type: "Historic Observatory" },
  { name: "India Gate", destination: "Delhi", type: "Monument" },
  { name: "Red Fort", destination: "Delhi", type: "Fort" },
  { name: "Humayun's Tomb", destination: "Delhi", type: "Tomb" },
  { name: "Qutub Minar", destination: "Delhi", type: "Monument" },
  { name: "Taj Mahal", destination: "Agra", type: "Monument" },
  { name: "Agra Fort", destination: "Agra", type: "Fort" },
  { name: "Mehtab Bagh", destination: "Agra", type: "Garden" },
  { name: "City Palace Udaipur", destination: "Udaipur", type: "Palace" },
  { name: "Lake Pichola", destination: "Udaipur", type: "Lake" },
  { name: "Jagdish Temple", destination: "Udaipur", type: "Temple" },
  { name: "Baga Beach", destination: "Goa", type: "Beach" },
  { name: "Calangute Beach", destination: "Goa", type: "Beach" },
  { name: "Fort Aguada", destination: "Goa", type: "Fort" },
  { name: "Basilica of Bom Jesus", destination: "Goa", type: "Basilica" },
  { name: "Gateway of India", destination: "Mumbai", type: "Monument" },
  { name: "Marine Drive", destination: "Mumbai", type: "Promenade" },
  { name: "Chhatrapati Shivaji Maharaj Terminus", destination: "Mumbai", type: "Heritage Building" },
  { name: "Elephanta Caves", destination: "Mumbai", type: "Cave Complex" },
  { name: "Dashashwamedh Ghat", destination: "Varanasi", type: "Ghat" },
  { name: "Assi Ghat", destination: "Varanasi", type: "Ghat" },
  { name: "Kashi Vishwanath Temple", destination: "Varanasi", type: "Temple" },
  { name: "Laxman Jhula", destination: "Rishikesh", type: "Landmark" },
  { name: "Triveni Ghat", destination: "Rishikesh", type: "Ghat" },
  { name: "Beatles Ashram", destination: "Rishikesh", type: "Ashram" },
  { name: "Golden Temple", destination: "Amritsar", type: "Temple" },
  { name: "Jallianwala Bagh", destination: "Amritsar", type: "Memorial" },
  { name: "Wagah Border", destination: "Amritsar", type: "Border Ceremony Site" },
  { name: "Fort Kochi", destination: "Kochi", type: "Heritage Area" },
  { name: "Chinese Fishing Nets", destination: "Kochi", type: "Landmark" },
  { name: "Mattancherry Palace", destination: "Kochi", type: "Palace" },
];

const experiences = [
  "Heritage Walk", "Palace Exploration", "Street Food Tour",
  "Local Cuisine Experience", "Photography Walk", "Cultural Tour",
  "Architecture Tour", "Sunrise Experience", "Sunset Experience",
  "Boat Ride", "Beach Day", "Scuba Diving", "Snorkeling",
  "Fort Exploration", "Temple Visit", "Spiritual Walk", "River Ghat Walk",
  "Adventure Trek", "River Rafting", "Shopping Tour", "Art & Craft Workshop",
  "Night Market Experience", "Historical Tour", "Local Market Exploration",
  "Wildlife & Nature Experience", "Water Sports",
];

const interests = [
  "History", "Architecture", "Culture", "Food", "Photography", "Nature",
  "Adventure", "Beaches", "Spirituality", "Art", "Heritage", "Shopping",
];

const cuisines = [
  "Rajasthani", "North Indian", "Mughlai", "Punjabi", "Goan",
  "Maharashtrian", "South Indian", "Street Food", "Seafood", "Vegetarian",
];

const placeExperiences = [
  ["Amer Fort", "Heritage Walk"], ["Amer Fort", "Photography Walk"], ["Amer Fort", "Fort Exploration"],
  ["City Palace Jaipur", "Palace Exploration"], ["City Palace Jaipur", "Photography Walk"], ["City Palace Jaipur", "Cultural Tour"],
  ["Hawa Mahal", "Photography Walk"], ["Hawa Mahal", "Architecture Tour"],
  ["Jantar Mantar Jaipur", "Architecture Tour"], ["Jantar Mantar Jaipur", "Historical Tour"],
  ["India Gate", "Photography Walk"], ["India Gate", "Sunset Experience"],
  ["Red Fort", "Heritage Walk"], ["Red Fort", "Historical Tour"], ["Red Fort", "Architecture Tour"],
  ["Humayun's Tomb", "Heritage Walk"], ["Humayun's Tomb", "Photography Walk"],
  ["Qutub Minar", "Historical Tour"], ["Qutub Minar", "Architecture Tour"], ["Qutub Minar", "Photography Walk"],
  ["Taj Mahal", "Sunrise Experience"], ["Taj Mahal", "Photography Walk"], ["Taj Mahal", "Heritage Walk"],
  ["Agra Fort", "Fort Exploration"], ["Agra Fort", "Historical Tour"], ["Agra Fort", "Architecture Tour"],
  ["Mehtab Bagh", "Sunset Experience"], ["Mehtab Bagh", "Photography Walk"],
  ["City Palace Udaipur", "Palace Exploration"], ["City Palace Udaipur", "Heritage Walk"], ["City Palace Udaipur", "Photography Walk"],
  ["Lake Pichola", "Boat Ride"], ["Lake Pichola", "Sunset Experience"],
  ["Jagdish Temple", "Temple Visit"], ["Jagdish Temple", "Cultural Tour"],
  ["Baga Beach", "Beach Day"], ["Baga Beach", "Night Market Experience"],
  ["Calangute Beach", "Beach Day"], ["Calangute Beach", "Water Sports"],
  ["Fort Aguada", "Fort Exploration"], ["Fort Aguada", "Sunset Experience"], ["Fort Aguada", "Photography Walk"],
  ["Basilica of Bom Jesus", "Heritage Walk"], ["Basilica of Bom Jesus", "Cultural Tour"],
  ["Gateway of India", "Photography Walk"], ["Gateway of India", "Historical Tour"], ["Gateway of India", "Boat Ride"],
  ["Marine Drive", "Sunset Experience"], ["Marine Drive", "Photography Walk"],
  ["Chhatrapati Shivaji Maharaj Terminus", "Architecture Tour"], ["Chhatrapati Shivaji Maharaj Terminus", "Historical Tour"],
  ["Elephanta Caves", "Heritage Walk"], ["Elephanta Caves", "Boat Ride"], ["Elephanta Caves", "Photography Walk"],
  ["Dashashwamedh Ghat", "River Ghat Walk"], ["Dashashwamedh Ghat", "Spiritual Walk"], ["Dashashwamedh Ghat", "Sunrise Experience"],
  ["Assi Ghat", "River Ghat Walk"], ["Assi Ghat", "Sunrise Experience"], ["Assi Ghat", "Spiritual Walk"],
  ["Kashi Vishwanath Temple", "Temple Visit"], ["Kashi Vishwanath Temple", "Spiritual Walk"],
  ["Laxman Jhula", "Photography Walk"], ["Laxman Jhula", "Adventure Trek"],
  ["Triveni Ghat", "Spiritual Walk"], ["Triveni Ghat", "River Ghat Walk"], ["Triveni Ghat", "Sunrise Experience"],
  ["Beatles Ashram", "Art & Craft Workshop"], ["Beatles Ashram", "Photography Walk"], ["Beatles Ashram", "Cultural Tour"],
  ["Golden Temple", "Temple Visit"], ["Golden Temple", "Spiritual Walk"], ["Golden Temple", "Photography Walk"],
  ["Jallianwala Bagh", "Historical Tour"], ["Jallianwala Bagh", "Heritage Walk"],
  ["Wagah Border", "Cultural Tour"], ["Wagah Border", "Historical Tour"],
  ["Fort Kochi", "Heritage Walk"], ["Fort Kochi", "Photography Walk"], ["Fort Kochi", "Cultural Tour"],
  ["Chinese Fishing Nets", "Photography Walk"], ["Chinese Fishing Nets", "Sunset Experience"],
  ["Mattancherry Palace", "Heritage Walk"], ["Mattancherry Palace", "Historical Tour"], ["Mattancherry Palace", "Architecture Tour"],
];

const experienceInterests = [
  ["Heritage Walk", "History"], ["Heritage Walk", "Culture"], ["Heritage Walk", "Heritage"],
  ["Palace Exploration", "History"], ["Palace Exploration", "Architecture"], ["Palace Exploration", "Heritage"],
  ["Street Food Tour", "Food"], ["Street Food Tour", "Culture"],
  ["Local Cuisine Experience", "Food"], ["Local Cuisine Experience", "Culture"],
  ["Photography Walk", "Photography"], ["Photography Walk", "Art"],
  ["Cultural Tour", "Culture"], ["Cultural Tour", "History"],
  ["Architecture Tour", "Architecture"], ["Architecture Tour", "Photography"], ["Architecture Tour", "Heritage"],
  ["Sunrise Experience", "Photography"], ["Sunrise Experience", "Nature"],
  ["Sunset Experience", "Photography"], ["Sunset Experience", "Nature"],
  ["Boat Ride", "Nature"], ["Boat Ride", "Photography"],
  ["Beach Day", "Beaches"], ["Beach Day", "Nature"],
  ["Scuba Diving", "Adventure"], ["Scuba Diving", "Beaches"], ["Scuba Diving", "Nature"],
  ["Snorkeling", "Adventure"], ["Snorkeling", "Beaches"], ["Snorkeling", "Nature"],
  ["Fort Exploration", "History"], ["Fort Exploration", "Architecture"], ["Fort Exploration", "Heritage"],
  ["Temple Visit", "Spirituality"], ["Temple Visit", "Culture"], ["Temple Visit", "History"],
  ["Spiritual Walk", "Spirituality"], ["Spiritual Walk", "Culture"],
  ["River Ghat Walk", "Spirituality"], ["River Ghat Walk", "Culture"], ["River Ghat Walk", "Photography"],
  ["Adventure Trek", "Adventure"], ["Adventure Trek", "Nature"],
  ["River Rafting", "Adventure"], ["River Rafting", "Nature"],
  ["Shopping Tour", "Shopping"], ["Shopping Tour", "Culture"],
  ["Art & Craft Workshop", "Art"], ["Art & Craft Workshop", "Culture"],
  ["Night Market Experience", "Shopping"], ["Night Market Experience", "Food"], ["Night Market Experience", "Culture"],
  ["Historical Tour", "History"], ["Historical Tour", "Heritage"],
  ["Local Market Exploration", "Shopping"], ["Local Market Exploration", "Food"], ["Local Market Exploration", "Culture"],
  ["Wildlife & Nature Experience", "Nature"], ["Wildlife & Nature Experience", "Photography"],
  ["Water Sports", "Adventure"], ["Water Sports", "Beaches"], ["Water Sports", "Nature"],
];

const destinationCuisines = [
  ["Jaipur", "Rajasthani"], ["Jaipur", "Vegetarian"], ["Jaipur", "Street Food"],
  ["Delhi", "North Indian"], ["Delhi", "Mughlai"], ["Delhi", "Street Food"], ["Delhi", "Vegetarian"],
  ["Agra", "Mughlai"], ["Agra", "North Indian"], ["Agra", "Street Food"],
  ["Udaipur", "Rajasthani"], ["Udaipur", "Vegetarian"],
  ["Goa", "Goan"], ["Goa", "Seafood"], ["Goa", "Vegetarian"],
  ["Mumbai", "Maharashtrian"], ["Mumbai", "Street Food"], ["Mumbai", "Seafood"], ["Mumbai", "Vegetarian"],
  ["Varanasi", "North Indian"], ["Varanasi", "Street Food"], ["Varanasi", "Vegetarian"],
  ["Rishikesh", "North Indian"], ["Rishikesh", "Vegetarian"],
  ["Amritsar", "Punjabi"], ["Amritsar", "North Indian"], ["Amritsar", "Vegetarian"],
  ["Kochi", "South Indian"], ["Kochi", "Seafood"], ["Kochi", "Vegetarian"],
];

const destinationConnections = [
  ["Delhi", "Agra"],
  ["Delhi", "Jaipur"],
  ["Agra", "Jaipur"],
  ["Agra", "Udaipur"],
  ["Jaipur", "Udaipur"],
  ["Mumbai", "Goa"],
  ["Delhi", "Varanasi"],
  ["Delhi", "Amritsar"],
  ["Mumbai", "Kochi"],
  ["Goa", "Kochi"],
  ["Rishikesh", "Delhi"],
  ["Varanasi", "Rishikesh"],
];

const validateSeedData = () => {
  const destinationNames = new Set(destinations.map((d) => d.name));
  const placeNames = new Set(places.map((p) => p.name));
  const experienceNames = new Set(experiences);
  const interestNames = new Set(interests);
  const cuisineNames = new Set(cuisines);

  const errors = [];

  for (const place of places) {
    if (!destinationNames.has(place.destination)) {
      errors.push(`Place "${place.name}" references unknown destination "${place.destination}"`);
    }
  }

  for (const [place, experience] of placeExperiences) {
    if (!placeNames.has(place) || !experienceNames.has(experience)) {
      errors.push(`Invalid place-experience: "${place}" -> "${experience}"`);
    }
  }

  for (const [experience, interest] of experienceInterests) {
    if (!experienceNames.has(experience) || !interestNames.has(interest)) {
      errors.push(`Invalid experience-interest: "${experience}" -> "${interest}"`);
    }
  }

  for (const [destination, cuisine] of destinationCuisines) {
    if (!destinationNames.has(destination) || !cuisineNames.has(cuisine)) {
      errors.push(`Invalid destination-cuisine: "${destination}" -> "${cuisine}"`);
    }
  }

  for (const [from, to] of destinationConnections) {
    if (!destinationNames.has(from) || !destinationNames.has(to)) {
      errors.push(`Invalid destination connection: "${from}" -> "${to}"`);
    }
  }

  if (errors.length) {
    throw new Error(`Seed validation failed:\n- ${errors.join("\n- ")}`);
  }
};

const createConstraints = async (session) => {
  const constraints = [
    `CREATE CONSTRAINT destination_name_unique IF NOT EXISTS FOR (d:Destination) REQUIRE d.name IS UNIQUE`,
    `CREATE CONSTRAINT place_name_unique IF NOT EXISTS FOR (p:Place) REQUIRE p.name IS UNIQUE`,
    `CREATE CONSTRAINT experience_name_unique IF NOT EXISTS FOR (e:Experience) REQUIRE e.name IS UNIQUE`,
    `CREATE CONSTRAINT interest_name_unique IF NOT EXISTS FOR (i:Interest) REQUIRE i.name IS UNIQUE`,
    `CREATE CONSTRAINT cuisine_name_unique IF NOT EXISTS FOR (c:Cuisine) REQUIRE c.name IS UNIQUE`,
  ];

  for (const query of constraints) {
    await session.run(query);
  }
};

const seedNodes = async (session) => {
  await session.run(
    `
    UNWIND $rows AS row
    CREATE (:Destination {
      name: row.name,
      state: row.state,
      country: row.country,
      description: row.description
    })
    `,
    { rows: destinations }
  );

  await session.run(
    `UNWIND $rows AS row CREATE (:Experience {name: row})`,
    { rows: experiences }
  );

  await session.run(
    `UNWIND $rows AS row CREATE (:Interest {name: row})`,
    { rows: interests }
  );

  await session.run(
    `UNWIND $rows AS row CREATE (:Cuisine {name: row})`,
    { rows: cuisines }
  );
};

const seedPlaces = async (session) => {
  const result = await session.run(
    `
    UNWIND $rows AS row
    MATCH (d:Destination {name: row.destination})
    CREATE (p:Place {
      name: row.name,
      type: row.type
    })
    CREATE (d)-[:HAS_PLACE]->(p)
    RETURN count(p) AS created
    `,
    { rows: places }
  );

  return result.records[0].get("created").toNumber();
};

const seedPlaceExperiences = async (session) => {
  const result = await session.run(
    `
    UNWIND $rows AS row
    MATCH (p:Place {name: row.placeName})
    MATCH (e:Experience {name: row.experienceName})
    CREATE (p)-[:OFFERS]->(e)
    RETURN count(*) AS created
    `,
    {
      rows: placeExperiences.map(([placeName, experienceName]) => ({
        placeName,
        experienceName,
      })),
    }
  );

  return result.records[0].get("created").toNumber();
};

const seedExperienceInterests = async (session) => {
  const result = await session.run(
    `
    UNWIND $rows AS row
    MATCH (e:Experience {name: row.experienceName})
    MATCH (i:Interest {name: row.interestName})
    CREATE (e)-[:SUITABLE_FOR]->(i)
    RETURN count(*) AS created
    `,
    {
      rows: experienceInterests.map(([experienceName, interestName]) => ({
        experienceName,
        interestName,
      })),
    }
  );

  return result.records[0].get("created").toNumber();
};

const seedDestinationCuisines = async (session) => {
  const result = await session.run(
    `
    UNWIND $rows AS row
    MATCH (d:Destination {name: row.destinationName})
    MATCH (c:Cuisine {name: row.cuisineName})
    CREATE (d)-[:POPULAR_FOR]->(c)
    RETURN count(*) AS created
    `,
    {
      rows: destinationCuisines.map(([destinationName, cuisineName]) => ({
        destinationName,
        cuisineName,
      })),
    }
  );

  return result.records[0].get("created").toNumber();
};

const seedDestinationConnections = async (session) => {
  const result = await session.run(
    `
    UNWIND $rows AS row
    MATCH (from:Destination {name: row.from})
    MATCH (to:Destination {name: row.to})
    CREATE (from)-[:CONNECTED_TO]->(to)
    RETURN count(*) AS created
    `,
    {
      rows: destinationConnections.map(([from, to]) => ({
        from,
        to,
      })),
    }
  );

  return result.records[0].get("created").toNumber();
};

const seedDatabase = async () => {
  validateSeedData();

  const session = driver.session();

  try {
    console.log("🌱 Starting Connect Your Journey database seed...");

    // This assignment uses a small, reproducible demo dataset.
    // Resetting before seeding keeps the seed deterministic.
    await session.run(`MATCH (n) DETACH DELETE n`);

    // Constraints are kept in the seed so the database can be reproduced
    // from the repository even without running setup-db.js first.
    await createConstraints(session);

    await seedNodes(session);

    const placesCreated = await seedPlaces(session);
    const offersCreated = await seedPlaceExperiences(session);
    const suitableForCreated = await seedExperienceInterests(session);
    const popularForCreated = await seedDestinationCuisines(session);
    const connectedToCreated = await seedDestinationConnections(session);

    const totalRelationships =
      placesCreated +
      offersCreated +
      suitableForCreated +
      popularForCreated +
      connectedToCreated;

    console.log("\n✅ Seed completed successfully");
    console.log(`   Destinations: ${destinations.length}`);
    console.log(`   Places: ${placesCreated}`);
    console.log(`   Experiences: ${experiences.length}`);
    console.log(`   Interests: ${interests.length}`);
    console.log(`   Cuisines: ${cuisines.length}`);

    console.log("\n🔗 Relationships:");
    console.log(`   HAS_PLACE: ${placesCreated}`);
    console.log(`   OFFERS: ${offersCreated}`);
    console.log(`   SUITABLE_FOR: ${suitableForCreated}`);
    console.log(`   POPULAR_FOR: ${popularForCreated}`);
    console.log(`   CONNECTED_TO: ${connectedToCreated}`);
    console.log(`   TOTAL: ${totalRelationships}`);
  } catch (error) {
    console.error("\n❌ Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await session.close();
    await driver.close();
  }
};

seedDatabase();