import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Compass } from "lucide-react";
import type { Destination, Place } from "../types";
import "./Cards.css";

// Helper to generate elegant editorial background gradient based on name string
export const getEditorialBg = (name: string): string => {
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const angles = [135, 45, 225, 315];
  const angle = angles[hash % angles.length];
  
  // Palette colors: Midnight, Coral, Yellow, Aqua, Blue (digital clean tints)
  const gradients = [
    `linear-gradient(${angle}deg, #FFFFFF 0%, #F6F7FB 100%)`,
    `linear-gradient(${angle}deg, rgba(91, 140, 255, 0.05) 0%, #FFFFFF 100%)`,
    `linear-gradient(${angle}deg, rgba(255, 92, 92, 0.03) 0%, #F6F7FB 100%)`,
    `linear-gradient(${angle}deg, rgba(53, 208, 186, 0.04) 0%, #FFFFFF 100%)`,
    `linear-gradient(${angle}deg, rgba(139, 124, 246, 0.04) 0%, #F6F7FB 100%)`,
  ];
  
  return gradients[hash % gradients.length];
};

// Frontend helper to retrieve simple category tags for destinations
export const getDestinationTags = (name: string): string => {
  const tagsMap: Record<string, string> = {
    Jaipur: "History · Culture · Photography",
    Delhi: "History · Food · Culture",
    Agra: "History · Architecture · Heritage",
    Udaipur: "History · Nature · Heritage",
    Goa: "Beaches · Nature · Adventure",
    Mumbai: "Culture · Food · Photography",
    Varanasi: "Spirituality · Culture · History",
    Rishikesh: "Spirituality · Adventure · Nature",
    Amritsar: "Spirituality · History · Food",
    Kochi: "History · Culture · Nature",
  };
  return tagsMap[name] || "Travel · Explore · Discover";
};

interface DestinationCardProps {
  destination: Destination;
  index: number;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, index }) => {
  const bgStyle = { background: getEditorialBg(destination.name) };
  const isLarge = index % 3 === 0;
  
  // Retrieve the first vibe tag for match label
  const tags = getDestinationTags(destination.name);
  const primaryVibe = tags.split(" · ")[0].toUpperCase();

  return (
    <Link
      to={`/destination/${encodeURIComponent(destination.name)}`}
      className={`destination-card ${isLarge ? "card-large" : ""}`}
      style={bgStyle}
    >
      <div className="card-decor">
        <span className="card-num">{(index + 1).toString().padStart(2, "0")}</span>
        <span className="match-badge">GREAT FOR {primaryVibe}</span>
        <Compass className="card-compass-icon" size={20} />
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{destination.name}</h3>
        <div className="card-location">
          <MapPin size={12} className="location-pin" />
          <span>{destination.state} · {destination.country}</span>
        </div>
        <p className="card-desc">{destination.description}</p>
        
        <div className="card-tags-row">
          {tags}
        </div>
        
        <div className="card-footer-editorial">
          <span className="card-action-link">Explore <span className="arrow-sym">→</span></span>
        </div>
      </div>
    </Link>
  );
};

interface PlaceCardProps {
  place: Place;
  status?: "DISCOVERED" | "NEXT STOP";
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, status }) => {
  return (
    <div className="place-card">
      <div className="place-header-row">
        <div className="place-badge">{place.type}</div>
        {status && (
          <span className={`place-status-badge ${status === "DISCOVERED" ? "discovered" : "next-stop"}`}>
            {status}
          </span>
        )}
      </div>
      <h4 className="place-name">{place.name}</h4>
      <div className="place-card-footer">
        <span className="place-connected-label">Explore</span>
        <ArrowRight size={14} className="place-arrow" />
      </div>
    </div>
  );
};

interface InterestSelectorProps {
  selectedInterest: string | null;
  onSelectInterest: (interest: string | null) => void;
}

export const INTERESTS_LIST = [
  "History",
  "Photography",
  "Food",
  "Nature",
  "Adventure",
  "Beaches",
  "Culture",
  "Shopping",
];

export const INTEREST_EMOJIS: Record<string, string> = {
  History: "🏛️",
  Photography: "📸",
  Food: "🍜",
  Nature: "🌿",
  Adventure: "🏄",
  Beaches: "🌊",
  Culture: "🎨",
  Shopping: "🛍️",
};

export const INTEREST_SUBTITLES: Record<string, string> = {
  History: "Stories from another time",
  Photography: "Chase the perfect frame",
  Food: "Follow your appetite",
  Nature: "Get a little closer to wild",
  Adventure: "Take the scenic route",
  Beaches: "Find your blue",
  Culture: "See the local side",
  Shopping: "Find something special",
};

export const InterestSelector: React.FC<InterestSelectorProps> = ({
  selectedInterest,
  onSelectInterest,
}) => {
  return (
    <div className="interest-selector-grid">
      {INTERESTS_LIST.map((interest) => {
        const active = selectedInterest === interest;
        const emoji = INTEREST_EMOJIS[interest] || "✨";
        const subtitle = INTEREST_SUBTITLES[interest] || "Explore this vibe";
        return (
          <button
            key={interest}
            onClick={() => onSelectInterest(active ? null : interest)}
            className={`interest-btn ${active ? "active" : ""}`}
          >
            <span className="interest-emoji-wrapper">
              <span className="interest-emoji">{emoji}</span>
              {active && <span className="interest-check-indicator">✓</span>}
            </span>
            <div className="interest-text-wrapper">
              <span className="interest-text">{interest}</span>
              <span className="interest-subtitle">{subtitle}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

interface DiscoveryCardProps {
  destination: Destination;
  interest: string;
  reason?: string; // Path representation e.g. "Amer Fort → Heritage Walk"
}

export const DiscoveryCard: React.FC<DiscoveryCardProps> = ({
  destination,
  interest,
  reason,
}) => {
  const placeName = reason ? reason.split(" → ")[0] : "local sights";
  const experienceName = reason ? reason.split(" → ")[1] : "memorable activities";
  const tags = getDestinationTags(destination.name);
  const primaryVibe = tags.split(" · ")[0].toUpperCase();

  return (
    <Link
      to={`/destination/${encodeURIComponent(destination.name)}`}
      className="discovery-card"
    >
      <div className="discovery-card-info">
        <div className="discovery-header-row">
          <span className="match-badge perfect-match">GREAT FOR {primaryVibe}</span>
          <div className="discovery-location">
            {destination.state} · {destination.country}
          </div>
        </div>
        <h3 className="discovery-dest-name">{destination.name}</h3>
        <p className="discovery-desc">{destination.description}</p>
      </div>

      <div className="discovery-card-reason">
        <div className="reason-header">
          <span className="reason-label">Why {destination.name}?</span>
        </div>
        <p className="reason-text">
          Because you love <strong>{interest.toLowerCase()}</strong>, you'll find places like <strong>{placeName}</strong> offering a wonderful <strong>{experienceName.toLowerCase()}</strong>.
        </p>
        <div className="discovery-card-footer-editorial" style={{ marginTop: "12px" }}>
          <span className="card-action-link" style={{ color: "var(--accent)", fontWeight: "600", fontSize: "0.95rem" }}>
            Explore {destination.name} <span className="arrow-sym">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
};
