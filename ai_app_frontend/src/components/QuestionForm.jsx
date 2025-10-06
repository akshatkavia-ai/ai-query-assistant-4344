import React, { useState } from 'react';

/**
 * QuestionForm component for user input.
 * Provides a textarea for entering questions and a submit button.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Callback function when form is submitted
 * @param {boolean} props.isLoading - Whether the form is in loading state
 */
// PUBLIC_INTERFACE
const QuestionForm = ({ onSubmit, isLoading }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() && !isLoading) {
      onSubmit(question);
      setQuestion(''); // Clear the form after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="question-form">
      <div className="form-group mb-md">
        <label htmlFor="question" className="form-label mb-sm">
          <h2 className="glow-text">Ask Your Question</h2>
        </label>
        <textarea
          id="question"
          className="textarea"
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={isLoading}
          rows={6}
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={isLoading || !question.trim()}
        style={{ width: '100%' }}
      >
        {isLoading ? (
          <>
            <span className="spinner" style={{ marginRight: '8px' }}></span>
            Processing...
          </>
        ) : (
          'Get Answer'
        )}
      </button>
    </form>
  );
};

export default QuestionForm;
