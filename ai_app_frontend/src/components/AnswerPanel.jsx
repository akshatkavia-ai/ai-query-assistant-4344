import React from 'react';

/**
 * AnswerPanel component for displaying AI responses.
 * Shows the answer text along with metadata like timestamp.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.response - The response object from the API
 * @param {string} props.response.answer - The AI-generated answer
 * @param {number} props.response.id - The response ID
 * @param {string} props.response.timestamp - The response timestamp
 */
// PUBLIC_INTERFACE
const AnswerPanel = ({ response }) => {
  if (!response) return null;

  const formatTimestamp = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return timestamp;
    }
  };

  return (
    <div className="answer-panel">
      <div className="card glow-border">
        <div className="answer-header mb-md">
          <h3 className="glow-text">AI Response</h3>
          {response.timestamp && (
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>
              {formatTimestamp(response.timestamp)}
            </p>
          )}
        </div>
        <div className="answer-content">
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
            {response.answer}
          </p>
        </div>
        {response.id && (
          <div className="answer-footer mt-md" style={{ paddingTop: '1rem', borderTop: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <p className="text-muted" style={{ fontSize: '0.75rem' }}>
              Response ID: {response.id}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerPanel;
