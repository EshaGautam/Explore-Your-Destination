export const GET_DESTINATION_INTERESTS = `
  MATCH
    (d:Destination {name: $destination})
    -[:HAS_PLACE]->
    (p:Place)
    -[:OFFERS]->
    (e:Experience)
    -[:SUITABLE_FOR]->
    (i:Interest)

  RETURN DISTINCT
    i.name AS interest

  ORDER BY interest
`;

export const GET_DESTINATIONS_BY_INTEREST = `
  MATCH
    (d:Destination)
    -[:HAS_PLACE]->
    (p:Place)
    -[:OFFERS]->
    (e:Experience)
    -[:SUITABLE_FOR]->
    (i:Interest {name: $interest})

  RETURN DISTINCT
    d.name AS destination,
    d.state AS state,
    d.country AS country

  ORDER BY destination
`;
export const GET_DESTINATION_GRAPH = `
  MATCH path =
    (d:Destination {name: $destination})
    -[:HAS_PLACE|OFFERS|SUITABLE_FOR*1..3]-
    (node)

  RETURN path
  LIMIT 100
`;