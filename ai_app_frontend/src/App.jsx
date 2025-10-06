import React, { useState } from 'react';
import QuestionForm from './components/QuestionForm';
import AnswerPanel from './components/AnswerPanel';
import { askQuestion } from './api/client';
import './styles/theme.css';
import './App.css';

/**
 * Main App component for the AI Q&A application.
 * Manages state for loading, errors, and API responses.
 * Provides a centered responsive UI with the Neon Cyber theme.
 */
// PUBLIC_INTERFACE
function App() {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handles question submission by calling the backend API.
   * 
   * @param {string} question - The question to submit
   */
  const handleQuestionSubmit = async (question) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const data = await askQuestion(question);
      setResponse(data);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Background gradient effect */}
      <div className="background-glow"></div>
      
      <div className="content-wrapper">
        <header className="app-header mb-xl">
          <h1 className="app-title glow-text">AI Question Assistant</h1>
          <p className="app-subtitle text-muted">
            Ask any question and get intelligent answers powered by AI
          </p>
        </header>

        <main className="app-main">
          <div className="form-section mb-lg">
            <QuestionForm onSubmit={handleQuestionSubmit} isLoading={isLoading} />
          </div>

          {error && (
            <div className="alert alert-error mb-lg">
              <strong>Error:</strong> {error}
            </div>
          )}

          {response && !error && (
            <div className="response-section mt-lg">
              <AnswerPanel response={response} />
            </div>
          )}
        </main>

        <footer className="app-footer mt-xl">
          <p className="text-muted text-center" style={{ fontSize: '0.875rem' }}>
            Powered by AI • Built with React
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
