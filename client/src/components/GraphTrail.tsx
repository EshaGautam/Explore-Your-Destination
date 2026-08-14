import React from "react";
import { Compass, MapPin, Footprints, Heart } from "lucide-react";
import "./GraphTrail.css";

interface GraphTrailProps {
  destination: string;
  place: string;
  experience: string;
  interest: string;
}

export const GraphTrail: React.FC<GraphTrailProps> = ({
  destination,
  place,
  experience,
  interest,
}) => {
  return (
    <div className="graph-trail-container">
      <div className="trail-line">
        <div className="trail-line-active"></div>
      </div>

      <div className="trail-nodes">
        {/* Node 1: Interest */}
        <div className="trail-node-wrapper">
          <div className="trail-node-icon interest-node">
            <Heart size={18} fill="currentColor" />
            <div className="node-pulse"></div>
          </div>
          <div className="trail-node-content">
            <span className="node-category">You love</span>
            <h4 className="node-title">{interest}</h4>
          </div>
        </div>

        {/* Node 2: Destination */}
        <div className="trail-node-wrapper">
          <div className="trail-node-icon dest-node">
            <Compass size={18} />
          </div>
          <div className="trail-node-content">
            <span className="node-category">You might enjoy</span>
            <h4 className="node-title">{destination}</h4>
          </div>
        </div>

        {/* Node 3: Place */}
        <div className="trail-node-wrapper">
          <div className="trail-node-icon place-node">
            <MapPin size={18} />
          </div>
          <div className="trail-node-content">
            <span className="node-category">Try visiting</span>
            <h4 className="node-title">{place}</h4>
          </div>
        </div>

        {/* Node 4: Experience */}
        <div className="trail-node-wrapper">
          <div className="trail-node-icon exp-node">
            <Footprints size={18} />
          </div>
          <div className="trail-node-content">
            <span className="node-category">Don't miss</span>
            <h4 className="node-title">{experience}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
