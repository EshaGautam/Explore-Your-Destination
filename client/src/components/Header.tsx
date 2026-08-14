import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="site-header">
      <div className="container header-container">
        <Link to="/" className="header-logo">
          <svg
            className="logo-icon"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 6 26 C 10 14, 20 18, 16 8 C 14 3, 22 2, 26 6" stroke="#FF5C5C" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 3" />
            <path d="M 6 26 C 10 14, 20 18, 16 8" stroke="#5B8CFF" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="6" cy="26" r="3.5" fill="#151827" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="16" cy="8" r="4.5" fill="#FF5C5C" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="26" cy="6" r="3.5" fill="#FFC857" stroke="#FFFFFF" strokeWidth="1.5" />
          </svg>
          <span className="logo-text">Explore Your Destination</span>
        </Link>

        <nav className="header-nav">
          <Link
            to="/"
            className={`nav-link ${isActive("/") ? "active" : ""}`}
          >
            Explore
          </Link>
          <Link
            to="/discover"
            className={`nav-link ${isActive("/discover") ? "active" : ""}`}
          >
            Discover
          </Link>
        </nav>

        <div className="header-actions">
          <Link to="/discover" className="btn-header-cta">
            Start exploring →
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
