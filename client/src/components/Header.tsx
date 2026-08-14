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
            <line x1="16" y1="8.5" x2="16" y2="10" stroke="#FFC857" strokeWidth="2" strokeLinecap="round" />
            <circle cx="16" cy="8.5" r="2.5" fill="#FFC857" />
            <path d="M 16 10 L 16 23 A 3 3 0 0 1 13 26" stroke="#5B8CFF" strokeWidth="2" strokeLinecap="round" />
            <path d="M 6 18 C 6 9, 26 9, 26 18 C 24.75 16.5, 22.25 16.5, 21 18 C 19.75 16.5, 17.25 16.5, 16 18 C 14.75 16.5, 12.25 16.5, 11 18 C 9.75 16.5, 7.25 16.5, 6 18 Z" fill="#FF5C5C" />
            <circle cx="8" cy="11" r="1.5" fill="#FFC857" />
            <circle cx="24" cy="11" r="1.5" fill="#5B8CFF" />
            <circle cx="25" cy="22" r="1.5" fill="#35D0BA" />
            <circle cx="7" cy="23" r="1.5" fill="#FF5C5C" />
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
