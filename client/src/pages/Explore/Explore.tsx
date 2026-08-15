import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header";
import {
  DestinationCard,
  InterestSelector,
  DiscoveryCard,
} from "../../components/Cards";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "../../components/Common";
import {
  getDestinations,
  getDestinationsByInterest,
} from "../../services/api";
import type { Destination } from "../../types";
import { ArrowRight, Search } from "lucide-react";
import "./Explore.css";

const Explore: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [interestDestinations, setInterestDestinations] = useState<Destination[]>([]);
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  
  // Loading & error states
  const [loadingDestinations, setLoadingDestinations] = useState(true);
  const [loadingInterest, setLoadingInterest] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const destinationsRef = useRef<HTMLDivElement>(null);
  const interestsRef = useRef<HTMLDivElement>(null);

  const loadData = async (search?: string) => {
    setLoadingDestinations(true);
    setError(null);
    try {
      const data = await getDestinations(search);
      setDestinations(data);
    } catch (err: any) {
      console.error(err);
      setError("Looks like the journey took a little detour. We couldn't load the destinations right now. Please try again.");
    } finally {
      setLoadingDestinations(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadData(searchQuery);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSelectInterest = async (interest: string | null) => {
    setSelectedInterest(interest);
    if (!interest) {
      setInterestDestinations([]);
      return;
    }

    setLoadingInterest(true);
    try {
      const data = await getDestinationsByInterest(interest);
      setInterestDestinations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingInterest(false);
    }
  };

  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="explore-page">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container-grid">
          <div className="hero-text-content">
            <span className="hero-eyebrow">TRAVEL DISCOVERY, YOUR WAY</span>
            <h1 className="hero-headline">
              Where will you go next?
            </h1>
            <p className="hero-subtext">
              Tell us what you love. We'll help you discover places worth exploring.
            </p>
            <div className="hero-actions">
              <button
                onClick={() => scrollToSection(interestsRef)}
                className="btn-primary"
              >
                Start exploring
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => scrollToSection(destinationsRef)}
                className="btn-secondary"
              >
                Browse destinations
              </button>
            </div>
          </div>

          <div className="hero-graph-visualization">
            <div className="adventure-map-container">
              <svg className="adventure-map-svg" viewBox="0 0 400 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Curved dotted background trails */}
                <path d="M50 300 C 100 200, 200 320, 300 250" stroke="var(--border)" strokeWidth="2" strokeDasharray="6 6" fill="none" />
                <path d="M120 50 C 180 120, 280 40, 350 150" stroke="var(--border)" strokeWidth="2" strokeDasharray="6 6" fill="none" />
                
                {/* Primary adventure path (coral color) */}
                <path
                  className="map-path-main animate-dash"
                  d="M80 60 C 120 140, 220 80, 240 180 C 260 280, 320 220, 340 300"
                  stroke="var(--accent)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
                
                {/* Tiny decorative stars */}
                <g className="decor-star" transform="translate(60, 160) scale(0.8)">
                  <path d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z" fill="var(--accent)" opacity="0.6" />
                </g>
                <g className="decor-star" transform="translate(320, 100) scale(0.8)">
                  <path d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z" fill="var(--secondary)" opacity="0.6" />
                </g>
                
                {/* Destination Markers */}
                <g className="map-marker" transform="translate(80, 60)">
                  <circle cx="0" cy="0" r="16" fill="rgba(255, 92, 92, 0.15)" className="pulse-ring" />
                  <circle cx="0" cy="0" r="7" fill="var(--accent)" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="18" y="5" className="marker-label">Jaipur</text>
                </g>
                
                <g className="map-marker" transform="translate(200, 110)">
                  <circle cx="0" cy="0" r="16" fill="rgba(91, 140, 255, 0.15)" className="pulse-ring" />
                  <circle cx="0" cy="0" r="7" fill="var(--secondary)" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="-55" y="5" className="marker-label">Agra</text>
                </g>
                
                <g className="map-marker" transform="translate(240, 210)">
                  <circle cx="0" cy="0" r="16" fill="rgba(255, 200, 87, 0.15)" className="pulse-ring" />
                  <circle cx="0" cy="0" r="7" fill="var(--yellow)" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="18" y="5" className="marker-label">Udaipur</text>
                </g>

                <g className="map-marker" transform="translate(340, 300)">
                  <circle cx="0" cy="0" r="16" fill="rgba(53, 208, 186, 0.15)" className="pulse-ring" />
                  <circle cx="0" cy="0" r="7" fill="var(--aqua)" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="-48" y="5" className="marker-label">Goa</text>
                </g>
                
                {/* Compass rose decoration in corner */}
                <g className="map-compass-rose" transform="translate(320, 50) scale(1.2)">
                  <circle cx="0" cy="0" r="14" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 2" fill="none" />
                  <line x1="0" y1="-18" x2="0" y2="18" stroke="var(--text-muted)" strokeWidth="0.75" />
                  <line x1="-18" y1="0" x2="18" y2="0" stroke="var(--text-muted)" strokeWidth="0.75" />
                  <path d="M0 -15 L3 -4 L0 -1 L-3 -4 Z" fill="var(--accent)" />
                  <path d="M0 15 L3 4 L0 1 L-3 4 Z" fill="var(--text-muted)" opacity="0.7" />
                  <path d="M15 0 L4 3 L1 0 L4 -3 Z" fill="var(--text-muted)" opacity="0.7" />
                  <path d="M-15 0 L-4 3 L-1 0 L-4 -3 Z" fill="var(--text-muted)" opacity="0.7" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Mood/Interest Selector Section */}
      <section className="interests-section section-padding" ref={interestsRef}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-badge-eyebrow">DISCOVERY</span>
            <h2 className="section-title">What's your travel vibe?</h2>
            <p className="section-subtitle max-w-md">
              Pick what you're into. We'll find the places that fit.
            </p>
          </div>

          <InterestSelector
            selectedInterest={selectedInterest}
            onSelectInterest={handleSelectInterest}
          />

          {selectedInterest && (
            <div className="vibe-find-cta-row" style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
              <button 
                className="btn-primary" 
                onClick={() => {
                  const resultsEl = document.getElementById("vibe-results");
                  if (resultsEl) resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Find my places →
              </button>
            </div>
          )}

          {selectedInterest && (
            <div className="interest-results-wrapper" id="vibe-results">
              <div className="results-adventure-header">
                <span className="results-adventure-badge">Good choice.</span>
                <h3 className="interest-results-title">
                  Here are a few places your interests could take you.
                </h3>
              </div>
              
              {loadingInterest ? (
                <LoadingState type="list" count={2} />
              ) : interestDestinations.length === 0 ? (
                <EmptyState
                  title="Hmm... nothing here yet"
                  message="Try another interest and let's find somewhere new."
                  actionLabel="Try another"
                  onAction={() => handleSelectInterest(null)}
                />
              ) : (
                <div className="discovery-cards-grid">
                  {interestDestinations.map((dest) => (
                    <DiscoveryCard
                      key={dest.name}
                      destination={dest}
                      interest={selectedInterest}
                      reason={
                        selectedInterest === "History" 
                          ? "Amer Fort → Heritage Walk" 
                          : selectedInterest === "Food"
                          ? "Local Cuisines → Culinary Walk"
                          : "Local Attractions → Explorer Trail"
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Destinations List Section */}
      <section className="destinations-section section-padding" ref={destinationsRef}>
        <div className="container">
          <div className="section-header search-section-header">
            <div>
              <h2 className="section-title">Browse destinations</h2>
              <p className="section-subtitle">
                Explore beautiful spots and find your next adventure.
              </p>
            </div>
            
            {/* Simple Search bar */}
            <div className="search-bar-wrapper">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Where would you like to explore?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {loadingDestinations ? (
            <LoadingState type="card" count={3} />
          ) : error ? (
            <ErrorState message={error} onRetry={() => loadData(searchQuery)} />
          ) : destinations.length === 0 ? (
            <EmptyState
              title="We couldn't find that place"
              message="Try searching for another destination."
              actionLabel="Show all places"
              onAction={() => setSearchQuery("")}
            />
          ) : (
            <div className="editorial-grid">
              {destinations.map((dest, idx) => (
                <DestinationCard key={dest.name} destination={dest} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Explore;
