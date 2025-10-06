import React, { useState } from 'react';
import { askQuestion } from '../services/api';
import './QuestionForm.css';

// PUBLIC_INTERFACE
/**
 * QuestionForm component for submitting questions to the AI
 * @param {Object} props - Component props
 * @param {Function} props.onResponse - Callback when response is received
 * @param {Function} props.onLoading - Callback for loading state changes
 * @param {Function} props.onError - Callback for error handling
 */
function QuestionForm({ onResponse, onLoading, onError }) {
  const [question, setQuestion] = useState('');

  // PUBLIC_INTERFACE
  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!question.trim()) {
      onError('Please enter a question');
      return;
    }

    try {
      onLoading(true);
      onError(null);
      
      const data = await askQuestion(question);
      onResponse(data);
      setQuestion(''); // Clear input after successful submission
    } catch (error) {
      onError(error.message || 'Failed to get answer. Please try again.');
    } finally {
      onLoading(false);
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Handle input change
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    setQuestion(e.target.value);
    if (e.target.value.trim()) {
      onError(null); // Clear error when user starts typing
    }
  };

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="question" className="form-label">
          Your Question
        </label>
        <textarea
          id="question"
          className="form-input"
          value={question}
          onChange={handleChange}
          placeholder="Ask me anything..."
          rows="4"
          maxLength="1000"
        />
        <div className="character-count">
          {question.length}/1000
        </div>
      </div>
      
      <button 
        type="submit" 
        className="submit-button"
        disabled={!question.trim()}
      >
        <span className="button-icon">✨</span>
        Ask AI
      </button>
    </form>
  );
}

export default QuestionForm;
