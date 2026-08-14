import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header";
import { PlaceCard, getEditorialBg } from "../../components/Cards";
import { GraphTrail } from "../../components/GraphTrail";
import { LoadingState, ErrorState } from "../../components/Common";
import {
  getDestination,
  getDestinationPlaces,
  getDestinationInterests,
} from "../../services/api";
import type { Destination as DestinationType, Place } from "../../types";
import { MapPin, Compass, ArrowLeft, ChefHat, Link as LinkIcon } from "lucide-react";
import "./Destination.css";

// Frontend helper for Cuisines based on seed data
const getCuisinesByDestination = (name: string): string[] => {
  const cuisinesMap: Record<string, string[]> = {
    Jaipur: ["Rajasthani", "Vegetarian", "Street Food"],
    Delhi: ["North Indian", "Mughlai", "Street Food", "Vegetarian"],
    Agra: ["Mughlai", "North Indian", "Street Food"],
    Udaipur: ["Rajasthani", "Vegetarian"],
    Goa: ["Goan", "Seafood", "Vegetarian"],
    Mumbai: ["Maharashtrian", "Street Food", "Seafood", "Vegetarian"],
    Varanasi: ["North Indian", "Street Food", "Vegetarian"],
    Rishikesh: ["North Indian", "Vegetarian"],
    Amritsar: ["Punjabi", "North Indian", "Vegetarian"],
    Kochi: ["South Indian", "Seafood", "Vegetarian"],
  };
  return cuisinesMap[name] || ["Local Cuisine", "Street Food"];
};

// Frontend helper for Connections based on seed data
const getConnectionsByDestination = (name: string): string[] => {
  const connectionsMap: Record<string, string[]> = {
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
  return connectionsMap[name] || [];
};

// Helper for mapping place -> experience -> interest dynamically for the graph trail showcase
const getShowcasePath = (_destName: string, interest: string, places: Place[]) => {
  const placeName = places.length > 0 ? places[0].name : "Local Sights";
  
  const expMap: Record<string, string> = {
    History: "Heritage Walk",
    Architecture: "Architecture Tour",
    Culture: "Cultural Tour",
    Food: "Street Food Tour",
    Photography: "Photography Walk",
    Nature: "Sunset Experience",
    Adventure: "Adventure Trek",
    Beaches: "Beach Day",
    Spirituality: "Spiritual Walk",
    Art: "Art & Craft Workshop",
    Heritage: "Heritage Walk",
    Shopping: "Shopping Tour",
  };

  return {
    place: placeName,
    experience: expMap[interest] || "Local Exploration",
  };
};

const getFriendlyInterestTag = (interest: string): string => {
  const map: Record<string, string> = {
    History: "Great for history lovers",
    Photography: "Perfect for photographers",
    Culture: "Good for culture seekers",
    Nature: "Perfect for nature lovers",
    Adventure: "Great for adventure seekers",
    Beaches: "Wonderful for beach lovers",
    Food: "Perfect for food lovers",
    Shopping: "Fun for shopping fans",
  };
  return map[interest] || `Perfect for ${interest.toLowerCase()} seekers`;
};

const Destination: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const [destination, setDestination] = useState<DestinationType | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    if (!name) return;
    setLoading(true);
    setError(null);
    try {
      const decodedName = decodeURIComponent(name);
      const destData = await getDestination(decodedName);
      if (!destData) {
        setError("Looks like the journey took a little detour. We couldn't load the destination details.");
        setLoading(false);
        return;
      }
      setDestination(destData);

      const [placesData, interestsData] = await Promise.all([
        getDestinationPlaces(decodedName),
        getDestinationInterests(decodedName),
      ]);
      
      setPlaces(placesData);
      setInterests(interestsData);
    } catch (err: any) {
      console.error(err);
      setError("Looks like the journey took a little detour. We couldn't load the destination details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [name]);

  if (loading) {
    return (
      <div className="destination-detail-page">
        <Header />
        <LoadingState type="detail" />
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="destination-detail-page">
        <Header />
        <ErrorState message={error || "Profile not loaded"} onRetry={loadData} />
      </div>
    );
  }

  const editorialBg = getEditorialBg(destination.name);
  const cuisines = getCuisinesByDestination(destination.name);
  const connections = getConnectionsByDestination(destination.name);

  return (
    <div className="destination-detail-page">
      <Header />

      {/* Back Button & Journey Stepper wrapper */}
      <div className="container destination-top-nav">
        <button onClick={() => navigate(-1)} className="btn-back">
          <ArrowLeft size={16} />
          <span>Back to explore</span>
        </button>

        {/* Journey Stepper Progress */}
        <div className="journey-stepper-box">
          <span className="journey-stepper-title">YOUR JOURNEY</span>
          <div className="journey-steps">
            <div className="journey-step completed">
              <span className="step-dot">●</span>
              <span className="step-label">Discover</span>
            </div>
            <div className="journey-step-connector completed"></div>
            <div className="journey-step completed">
              <span className="step-dot">●</span>
              <span className="step-label">Explore</span>
            </div>
            <div className="journey-step-connector"></div>
            <div className="journey-step">
              <span className="step-dot">○</span>
              <span className="step-label">Find experiences</span>
            </div>
            <div className="journey-step-connector"></div>
            <div className="journey-step">
              <span className="step-dot">○</span>
              <span className="step-label">Choose what's next</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Profile Hero */}
      <section className="profile-hero" style={{ background: editorialBg }}>
        <div className="container hero-profile-container">
          <div className="profile-meta">
            <span className="profile-num">ADVENTURE UNLOCKED ✦</span>
            <div className="profile-loc">
              <MapPin size={14} />
              <span>{destination.state} · {destination.country}</span>
            </div>
          </div>
          <h1 className="profile-title">{destination.name}</h1>
          <p className="profile-desc">{destination.description || "Forts, palaces and colourful streets with stories around every corner."}</p>
          <div className="profile-hero-actions">
            <button className="btn-primary" onClick={() => {
              const element = document.getElementById("visit-section");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}>
              Explore {destination.name} →
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid content */}
      <div className="container profile-main-grid">
        {/* Left Side: Places & Cuisines */}
        <div className="profile-content-left">
          {/* Things to See */}
          <section className="detail-section" id="visit-section">
            <div className="detail-section-header">
              <span className="section-eyebrow">THINGS TO SEE</span>
              <h2 className="detail-section-title">Places to discover</h2>
            </div>
            {places.length === 0 ? (
              <div className="empty-places-state">
                <p>No specific places added for this destination yet.</p>
              </div>
            ) : (
              <div className="places-editorial-grid">
                {places.map((place, idx) => (
                  <PlaceCard key={place.name} place={place} status={idx === 0 ? "DISCOVERED" : "NEXT STOP"} />
                ))}
              </div>
            )}
          </section>

          {/* Things to Do / Experiences */}
          <section className="detail-section">
            <div className="detail-section-header">
              <span className="section-eyebrow">THINGS TO DO</span>
              <h2 className="detail-section-title">What can you do here?</h2>
            </div>
            <div className="experiences-stack">
              {interests.slice(0, 4).map((interest, idx) => {
                const path = getShowcasePath(destination.name, interest, places);
                const icons = [MapPin, Compass, ChefHat, LinkIcon];
                const IconComp = icons[idx % icons.length];
                return (
                  <div className="experience-detail-row-wrapper" key={interest}>
                    <div className="experience-detail-row">
                      <div className="exp-detail-icon-box">
                        <IconComp size={16} className="exp-icon" />
                      </div>
                      <div className="exp-detail-text">
                        <strong>{path.experience}</strong> at {path.place}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Local Flavours */}
          <section className="detail-section flavors-section">
            <div className="detail-section-header">
              <span className="section-eyebrow">LOCAL FLAVOURS</span>
              <h2 className="detail-section-title">Don't leave without trying...</h2>
            </div>
            <div className="cuisines-wrapper">
              {cuisines.map((cuisine) => (
                <div className="cuisine-badge-card" key={cuisine}>
                  <ChefHat size={16} className="cuisine-icon" />
                  <span>{cuisine}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Side: Graph Trail & Connections */}
        <div className="profile-content-right">
          {/* Showcase Interests Path */}
          <section className="detail-section right-section border-card">
            <div className="detail-section-header">
              <span className="section-eyebrow">MADE FOR</span>
              <h2 className="detail-section-title">Made for curious travellers</h2>
              <p className="section-desc">
                Follow your curiosity to see how one thing leads to another.
              </p>
            </div>

            <div className="graph-trails-stack">
              {interests.slice(0, 3).map((interest) => {
                const path = getShowcasePath(destination.name, interest, places);
                const friendlyLabel = getFriendlyInterestTag(interest);
                return (
                  <div className="showcase-trail-box" key={interest}>
                    <div className="showcase-trail-header">
                      <span className="showcase-interest-tag">{friendlyLabel}</span>
                    </div>
                    <GraphTrail
                      destination={destination.name}
                      place={path.place}
                      experience={path.experience}
                      interest={interest}
                    />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Connected Destinations */}
          <section className="detail-section right-section border-card connections-section">
            <div className="detail-section-header">
              <span className="section-eyebrow">NEXT ADVENTURE</span>
              <h2 className="detail-section-title">Where could you go next?</h2>
              <p className="section-desc">
                One trip can lead to another.
              </p>
            </div>
            
            {connections.length === 0 ? (
              <p className="no-connections-text">No immediate neighboring places in this loop.</p>
            ) : (
              <div className="adventure-continuation-box">
                <div className="connected-nodes-trail">
                  {connections.slice(0, 3).map((conn, idx) => (
                    <React.Fragment key={conn}>
                      <Link
                        to={`/destination/${encodeURIComponent(conn)}`}
                        className="adventure-node-card"
                      >
                        <div className="adventure-node-marker">
                          <Compass size={14} className="node-compass" />
                        </div>
                        <div className="adventure-node-label-group">
                          <span className="node-title">{conn}</span>
                          <span className="node-subtitle">Unlock Stop</span>
                        </div>
                      </Link>
                      {idx < Math.min(connections.length, 3) - 1 && (
                        <div className="adventure-trail-arrow">
                          <div className="trail-arrow-line"></div>
                          <span className="arrow-head">→</span>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="continuation-cta-row">
                  <Link to={`/destination/${encodeURIComponent(connections[0])}`} className="btn-primary">
                    Continue exploring →
                  </Link>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Destination;
