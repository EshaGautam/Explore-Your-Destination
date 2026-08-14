import React from "react";
import "./Common.css";

interface LoadingProps {
  type?: "card" | "detail" | "list";
  count?: number;
}

export const LoadingState: React.FC<LoadingProps> = ({ type = "card", count = 3 }) => {
  const renderSkeletons = () => {
    if (type === "detail") {
      return (
        <div className="skeleton-container container detail-skeleton">
          <div className="skeleton-title"></div>
          <div className="skeleton-subtitle"></div>
          <div className="skeleton-grid">
            <div className="skeleton-card-large"></div>
            <div className="skeleton-card-large"></div>
          </div>
        </div>
      );
    }

    if (type === "list") {
      return (
        <div className="skeleton-container list-skeleton">
          <div className="skeleton-item"></div>
          <div className="skeleton-item"></div>
          <div className="skeleton-item"></div>
        </div>
      );
    }

    return (
      <div className="skeleton-container container card-skeleton-grid">
        {Array.from({ length: count }).map((_, index) => (
          <div className="skeleton-card" key={index}>
            <div className="skeleton-card-image"></div>
            <div className="skeleton-card-title"></div>
            <div className="skeleton-card-text"></div>
            <div className="skeleton-card-link"></div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="adventure-loading-wrapper">
      <div className="adventure-loading-bar">
        <span className="loading-adventure-text">Following the trail...</span>
        <div className="adventure-trail-loader">
          <div className="loader-trail-line"></div>
          <div className="loader-trail-dot animate-dot-move"></div>
        </div>
      </div>
      {renderSkeletons()}
    </div>
  );
};

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorProps> = ({ message, onRetry }) => {
  return (
    <div className="container state-container error-state">
      <div className="state-icon-wrapper error-icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h3 className="state-title">Looks like we took a wrong turn</h3>
      <p className="state-message">
        {message || "We couldn't load this adventure right now."}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary state-btn">
          Try again
        </button>
      )}
    </div>
  );
};

interface EmptyProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyProps> = ({
  title = "Nothing connected yet",
  message = "Try another interest and explore a different path.",
  actionLabel,
  onAction,
}) => {
  return (
    <div className="container state-container empty-state">
      <div className="state-icon-wrapper empty-icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 11.034C18 14.897 12 19 12 19s-6-4.103-6-7.966C6 7.655 8.686 5 12 5c3.314 0 6 2.655 6 6.034Z" />
          <circle cx="12" cy="11" r="2" />
        </svg>
      </div>
      <h3 className="state-title">{title}</h3>
      <p className="state-message">{message}</p>
      {onAction && actionLabel && (
        <button onClick={onAction} className="btn-secondary state-btn">
          {actionLabel}
        </button>
      )}
    </div>
  );
};
