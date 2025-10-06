import React from 'react';
import './ResponseDisplay.css';

// PUBLIC_INTERFACE
/**
 * ResponseDisplay component for showing AI responses
 * @param {Object} props - Component props
 * @param {Object} props.response - Response object containing answer, id, and created_at
 */
function ResponseDisplay({ response }) {
  if (!response) return null;

  // PUBLIC_INTERFACE
  /**
   * Format the timestamp to a readable format
   * @param {string} timestamp - ISO timestamp string
   * @returns {string} Formatted date string
   */
  const formatTimestamp = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return timestamp;
    }
  };

  return (
    <div className="response-display" role="region" aria-label="AI Response">
      <div className="response-header">
        <h2 className="response-title">
          <span className="response-icon">💡</span>
          AI Answer
        </h2>
        {response.created_at && (
          <span className="response-timestamp">
            {formatTimestamp(response.created_at)}
          </span>
        )}
      </div>

      <div className="response-content">
        <p className="response-text">{response.answer}</p>
      </div>

      <div className="response-footer">
        <span className="response-id">Response ID: #{response.id}</span>
      </div>
    </div>
  );
}

export default ResponseDisplay;
