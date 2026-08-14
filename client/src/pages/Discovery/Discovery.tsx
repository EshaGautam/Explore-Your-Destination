import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header";
import { InterestSelector } from "../../components/Cards";
import { GraphTrail } from "../../components/GraphTrail";
import { LoadingState, EmptyState } from "../../components/Common";
import { getDestinationsByInterest, getDestinations } from "../../services/api";
import type { Destination } from "../../types";
import { Sparkles, Route, Compass, Search, AlertCircle } from "lucide-react";
import "./Discovery.css";

// Front-end BFS routing engine matching seed connection graph
const connectionGraph: Record<string, string[]> = {
  Delhi: ["Agra", "Jaipur", "Varanasi", "Amritsar", "Rishikesh"],
  Agra: ["Delhi", "Jaipur", "Udaipur"],
  Jaipur: ["Delhi", "Agra", "Udaipur"],
  Udaipur: ["Agra", "Jaipur"],
  Goa: ["Mumbai", "Kochi"],
  Mumbai: ["Goa", "Kochi"],
  Varanasi: ["Delhi", "Rishikesh"],
  Rishikesh: ["Delhi", "Varanasi"],
  Amritsar: ["Delhi"],
  Kochi: ["Mumbai", "Goa"],
};

const findConnectionPath = (start: string, end: string): string[] | null => {
  if (start === end) return [start];
  const queue: string[][] = [[start]];
  const visited = new Set<string>([start]);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const node = path[path.length - 1];

    const neighbors = connectionGraph[node] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        const newPath = [...path, neighbor];
        if (neighbor === end) {
          return newPath;
        }
        queue.push(newPath);
      }
    }
  }
  return null;
};

// Seed-matched graph path mapping for Interest discovery card trails
const getInterestPathDetails = (destName: string, interest: string): { place: string; experience: string } => {
  const mapping: Record<string, Record<string, { place: string; experience: string }>> = {
    Jaipur: {
      History: { place: "Amer Fort", experience: "Heritage Walk" },
      Architecture: { place: "Hawa Mahal", experience: "Architecture Tour" },
      Culture: { place: "City Palace Jaipur", experience: "Cultural Tour" },
      Photography: { place: "Amer Fort", experience: "Photography Walk" },
    },
    Delhi: {
      History: { place: "Red Fort", experience: "Heritage Walk" },
      Architecture: { place: "Qutub Minar", experience: "Architecture Tour" },
      Culture: { place: "Red Fort", experience: "Heritage Walk" },
      Food: { place: "Delhi Street Markets", experience: "Street Food Tour" },
    },
    Agra: {
      History: { place: "Taj Mahal", experience: "Heritage Walk" },
      Architecture: { place: "Taj Mahal", experience: "Architecture Tour" },
      Nature: { place: "Mehtab Bagh", experience: "Sunset Experience" },
    },
    Udaipur: {
      History: { place: "City Palace Udaipur", experience: "Palace Exploration" },
      Nature: { place: "Lake Pichola", experience: "Boat Ride" },
    },
    Goa: {
      Beaches: { place: "Baga Beach", experience: "Beach Day" },
      Adventure: { place: "Calangute Beach", experience: "Water Sports" },
      Culture: { place: "Basilica of Bom Jesus", experience: "Cultural Tour" },
    },
    Mumbai: {
      History: { place: "Gateway of India", experience: "Historical Tour" },
      Architecture: { place: "Chhatrapati Shivaji Maharaj Terminus", experience: "Architecture Tour" },
      Nature: { place: "Marine Drive", experience: "Sunset Experience" },
    },
    Varanasi: {
      Spirituality: { place: "Kashi Vishwanath Temple", experience: "Spiritual Walk" },
      Culture: { place: "Dashashwamedh Ghat", experience: "River Ghat Walk" },
    },
    Rishikesh: {
      Spirituality: { place: "Triveni Ghat", experience: "Spiritual Walk" },
      Adventure: { place: "Laxman Jhula", experience: "Adventure Trek" },
    },
    Amritsar: {
      Spirituality: { place: "Golden Temple", experience: "Temple Visit" },
      History: { place: "Jallianwala Bagh", experience: "Historical Tour" },
    },
    Kochi: {
      Culture: { place: "Fort Kochi", experience: "Cultural Tour" },
      History: { place: "Mattancherry Palace", experience: "Heritage Walk" },
    },
  };

  return (
    mapping[destName]?.[interest] || {
      place: "Local Landmarks",
      experience: `${interest} Experience`,
    }
  );
};

const getDiscoveryWhyExplanation = (name: string, interest: string): string => {
  const explanations: Record<string, Record<string, string>> = {
    Jaipur: {
      History: "You'll find beautiful architecture, historic forts and plenty of heritage walk stories.",
      Photography: "It is famous for the stunning pink streets, palaces, and incredible panoramic viewpoints at sunrise.",
      Culture: "Enjoy classical architecture, vibrant local bazars, and traditional Rajasthani performances.",
      Architecture: "Home to astronomical observatories and unique wind-palaces with ornate windows.",
    },
    Delhi: {
      History: "Features spectacular Mughal monuments, colonial landmarks, and centuries-old ruins.",
      Food: "Enjoy world-famous street food, historic Mughlai kitchens, and diverse modern eateries.",
      Culture: "A melting pot of cultures, festivals, crafts museums, and historic bazaars.",
    },
    Agra: {
      History: "Home to the world's most famous monument of love, historic forts, and Mughal heritage.",
      Architecture: "Features world-class white marble craftsmanship and symmetrical gardens.",
      Nature: "Enjoy sunset views of the monuments across the serene Yamuna riverbanks.",
    },
    Udaipur: {
      History: "Known for towering lakeside palaces, tales of Maharanas, and royal museums.",
      Nature: "Famous for quiet boat rides on peaceful lakes surrounded by green hills.",
    },
    Goa: {
      Beaches: "Perfect for sandy beach days, sunset walks, and seaside cafes.",
      Adventure: "Offers thrilling water sports, scuba diving, and coastal activities.",
      Culture: "Blend of Portuguese-Indian heritage, ancient cathedrals, and spice plantations.",
    },
    Mumbai: {
      History: "Features Victorian architectural monuments, historic caves, and legacy museums.",
      Food: "Famous for coastal seafood, traditional Maharashtrian dishes, and fast-paced street snacks.",
      Nature: "Stroll along beautiful seaside promenades and watch golden sunsets over the Arabian Sea.",
    },
    Varanasi: {
      Spirituality: "One of the world's oldest spiritual centers with holy river ceremonies and temples.",
      Culture: "Immerse in ancient cultural walks, classical music heritages, and riverside weavers.",
    },
    Rishikesh: {
      Spirituality: "The world capital of yoga, set against the holy river with ashrams and retreats.",
      Adventure: "Enjoy river rafting, trekking in the foothills, and bridge walks.",
    },
    Amritsar: {
      Spirituality: "Home to the Golden Temple, offering community dining and serene lake reflection walks.",
      History: "Reflect at historic memorials and check out the energetic border ceremonies.",
    },
    Kochi: {
      Culture: "Discover unique arts like Kathakali, historic trading ports, and spice markets.",
      History: "Explore colonial architecture, Portuguese palaces, and ancient fishing lanes.",
    },
  };

  return (
    explanations[name]?.[interest] ||
    `Great match for your interest in ${interest.toLowerCase()} with unique local experiences.`
  );
};

const Discovery: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle Tab states (interests vs connections)
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get("tab") === "connections" ? "connections" : "interests";

  // Interest search states
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);

  // Connection search states
  const [allDests, setAllDests] = useState<Destination[]>([]);
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [calculatedPath, setCalculatedPath] = useState<string[] | null>(null);
  const [hasSearchedPath, setHasSearchedPath] = useState(false);

  // Load list of all destinations for selects in Connection page
  useEffect(() => {
    const loadCities = async () => {
      try {
        const data = await getDestinations();
        setAllDests(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadCities();
  }, []);

  // Update tabs via URL
  const setTab = (tab: "interests" | "connections") => {
    navigate(`/discover?tab=${tab}`);
  };

  const handleSelectInterest = async (interest: string | null) => {
    setSelectedInterest(interest);
    if (!interest) {
      setDestinations([]);
      return;
    }
    setLoading(true);
    try {
      const data = await getDestinationsByInterest(interest);
      setDestinations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFindPath = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromCity || !toCity) return;
    const path = findConnectionPath(fromCity, toCity);
    setCalculatedPath(path);
    setHasSearchedPath(true);
  };

  return (
    <div className="discovery-page">
      <Header />

      {/* Hero Section */}
      <section className="discover-hero">
        <div className="container text-center">
          <span className="discover-eyebrow">DISCOVERY BUILDER</span>
          <h1 className="discover-title">
            {activeTab === "interests" ? "Let's find somewhere you'll love." : "Plan a multi-stop trip."}
          </h1>
          <p className="discover-subtitle max-w-md">
            {activeTab === "interests"
              ? "Pick a few things you're into and we'll do the rest."
              : "Discover how cities connect together to plan the perfect multi-stop travel route."}
          </p>

          {/* Tab buttons */}
          <div className="discover-tabs">
            <button
              onClick={() => setTab("interests")}
              className={`tab-btn ${activeTab === "interests" ? "active" : ""}`}
            >
              <Sparkles size={16} />
              <span>Find by vibe</span>
            </button>
            <button
              onClick={() => setTab("connections")}
              className={`tab-btn ${activeTab === "connections" ? "active" : ""}`}
            >
              <Route size={16} />
              <span>Plan a multi-stop trip</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tab Contents */}
      <div className="container discover-content-container section-padding">
        {activeTab === "interests" ? (
          /* INTEREST DISCOVERY TAB */
          <div className="tab-interests-content">
            <div className="section-header text-center">
              <h2 className="detail-section-title">What's your vibe?</h2>
            </div>
            
            <InterestSelector
              selectedInterest={selectedInterest}
              onSelectInterest={handleSelectInterest}
            />

            {selectedInterest && (
              <div className="results-wrapper">
                <div className="results-header">
                  <h3 className="results-count-title">
                    Your next adventure could be...
                  </h3>
                </div>

                {loading ? (
                  <LoadingState type="card" count={3} />
                ) : destinations.length === 0 ? (
                  <EmptyState
                    title="Hmm... nothing here yet"
                    message="Try another interest and let's find somewhere new."
                    actionLabel="Try another"
                    onAction={() => handleSelectInterest(null)}
                  />
                ) : (
                  <div className="interest-visual-trails-grid">
                    {destinations.map((dest) => {
                      const path = getInterestPathDetails(dest.name, selectedInterest);
                      const whyReason = getDiscoveryWhyExplanation(dest.name, selectedInterest);
                      return (
                        <div className="trail-card" key={dest.name}>
                          <div className="trail-card-info">
                            <span className="trail-card-loc">
                              {dest.state}, {dest.country}
                            </span>
                            <h3 className="trail-card-title">{dest.name}</h3>
                            <p className="trail-card-desc">{dest.description}</p>
                            
                            {/* Why this matched explanation box */}
                            <div className="why-matched-editorial-box">
                              <h5>Why {dest.name}?</h5>
                              <p>{whyReason}</p>
                            </div>
                            
                            <div className="trail-card-footer">
                              <Link
                                to={`/destination/${encodeURIComponent(dest.name)}`}
                                className="btn-primary"
                              >
                                Explore {dest.name}
                              </Link>
                            </div>
                          </div>

                          <div className="trail-card-viz">
                            <span className="viz-box-label">Curiosity Trail</span>
                            <GraphTrail
                              destination={dest.name}
                              place={path.place}
                              experience={path.experience}
                              interest={selectedInterest}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* NEIGHBOR CONNECTIONS TAB */
          <div className="tab-connections-content">
            <div className="connections-grid-layout">
              {/* Left Column: Form Selector */}
              <div className="connections-form-card">
                <h3 className="form-title">Route Planner</h3>
                <p className="form-desc">
                  Pick where you want to start and where you want to end. We'll map the path.
                </p>

                <form onSubmit={handleFindPath} className="pathfinder-form">
                  <div className="form-group">
                    <label>Where are you starting?</label>
                    <select
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                      required
                      className="form-select"
                    >
                      <option value="">Choose departure city...</option>
                      {allDests.map((dest) => (
                        <option key={dest.name} value={dest.name}>
                          {dest.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Where would you like to end?</label>
                    <select
                      value={toCity}
                      onChange={(e) => setToCity(e.target.value)}
                      required
                      className="form-select"
                    >
                      <option value="">Choose arrival city...</option>
                      {allDests
                        .filter((dest) => dest.name !== fromCity)
                        .map((dest) => (
                          <option key={dest.name} value={dest.name}>
                            {dest.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <button type="submit" className="btn-primary form-submit-btn">
                    <Search size={16} />
                    <span>Show me the route</span>
                  </button>
                </form>
              </div>

              {/* Right Column: Connection Path Visualization */}
              <div className="connections-results-panel">
                {!hasSearchedPath ? (
                  <div className="path-placeholder-state">
                    <Route size={48} className="placeholder-icon animate-pulse" />
                    <h4>Where would you like to go?</h4>
                    <p>
                      Enter your departure and arrival cities, and we'll calculate the perfect stopovers along the way.
                    </p>
                  </div>
                ) : calculatedPath === null ? (
                  <div className="path-placeholder-state error-path">
                    <AlertCircle size={48} className="placeholder-icon" />
                    <h4>Hmm... route is too far</h4>
                    <p>
                      We couldn't link these two places directly in this circuit. Try choosing nearby destinations (like Delhi to Udaipur or Mumbai to Goa).
                    </p>
                  </div>
                ) : (
                  <div className="calculated-path-box">
                    <h3 className="path-results-title">Your road trip route 🚗</h3>
                    <p className="path-results-desc">
                      Here is the recommended multi-stop path:
                    </p>

                    <div className="horizontal-connection-trail">
                      {calculatedPath.map((city, index) => {
                        const isLast = index === calculatedPath.length - 1;
                        return (
                          <React.Fragment key={city}>
                            <Link
                              to={`/destination/${encodeURIComponent(city)}`}
                              className="path-city-node"
                            >
                              <div className="city-node-dot">
                                <Compass size={14} />
                              </div>
                              <span className="city-node-name">{city}</span>
                            </Link>
                            {!isLast && (
                              <div className="path-link-connector">
                                <span className="arrow-head">→</span>
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>

                    <div className="path-summary-details">
                      <div className="summary-stat">
                        <span className="stat-label">Stops on the way</span>
                        <span className="stat-value">{calculatedPath.length - 1}</span>
                      </div>
                      <div className="summary-stat">
                        <span className="stat-label">Total destinations</span>
                        <span className="stat-value">{calculatedPath.length}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discovery;
