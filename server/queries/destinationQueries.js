export const GET_DESTINATIONS = `
  MATCH (d:Destination)
  RETURN
    d.name AS name,
    d.state AS state,
    d.country AS country,
    d.description AS description
  ORDER BY d.name
`;

export const GET_DESTINATION = `
  MATCH (d:Destination {name: $name})
  RETURN
    d.name AS name,
    d.state AS state,
    d.country AS country,
    d.description AS description
`;

export const GET_DESTINATION_PLACES = `
  MATCH (d:Destination {name: $name})
        -[:HAS_PLACE]->
        (p:Place)

  RETURN
    p.name AS name,
    p.type AS type
  ORDER BY p.name
`;