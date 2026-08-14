CREATE CONSTRAINT destination_name_unique IF NOT EXISTS
FOR (d:Destination)
REQUIRE d.name IS UNIQUE;

CREATE CONSTRAINT place_name_unique IF NOT EXISTS
FOR (p:Place)
REQUIRE p.name IS UNIQUE;

CREATE CONSTRAINT experience_name_unique IF NOT EXISTS
FOR (e:Experience)
REQUIRE e.name IS UNIQUE;

CREATE CONSTRAINT interest_name_unique IF NOT EXISTS
FOR (i:Interest)
REQUIRE i.name IS UNIQUE;

CREATE CONSTRAINT cuisine_name_unique IF NOT EXISTS
FOR (c:Cuisine)
REQUIRE c.name IS UNIQUE;