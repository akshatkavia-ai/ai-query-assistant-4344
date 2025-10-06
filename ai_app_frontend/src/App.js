import React, { useState } from 'react';
import './App.css';
import QuestionForm from './components/QuestionForm';
import ResponseDisplay from './components/ResponseDisplay';

// PUBLIC_INTERFACE
/**
 * Main App component for AI Query Assistant
 * Manages question submission and response display state
 */
function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // PUBLIC_INTERFACE
  /**
   * Handle the submission of a question
   * @param {Object} data - Response data from the API
   */
  const handleResponse = (data) => {
    setResponse(data);
    setError(null);
  };

  // PUBLIC_INTERFACE
  /**
   * Handle loading state changes
   * @param {boolean} isLoading - Loading state
   */
  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };

  // PUBLIC_INTERFACE
  /**
   * Handle error state
   * @param {string} errorMessage - Error message to display
   */
  const handleError = (errorMessage) => {
    setError(errorMessage);
    setResponse(null);
  };

  return (
    <div className="App">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">
            <span className="title-icon">🤖</span>
            AI Query Assistant
          </h1>
          <p className="app-subtitle">Ask any question and get instant AI-powered answers</p>
        </header>

        <main className="app-main">
          <QuestionForm 
            onResponse={handleResponse}
            onLoading={handleLoading}
            onError={handleError}
          />
          
          {error && (
            <div className="error-container">
              <div className="error-icon">⚠️</div>
              <p className="error-message">{error}</p>
            </div>
          )}

          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">Thinking...</p>
            </div>
          )}

          {response && !loading && (
            <ResponseDisplay response={response} />
          )}
        </main>

        <footer className="app-footer">
          <p>Powered by Gemini AI</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
