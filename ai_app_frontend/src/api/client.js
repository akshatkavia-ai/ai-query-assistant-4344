/**
 * API client for communicating with the AI backend.
 * Reads the base URL from environment variables and provides methods for API calls.
 */

// Get API base URL from environment variable
// For Create React App, use REACT_APP_ prefix
// Fallback to localhost:3001 if not set
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

/**
 * Sends a question to the AI backend and returns the response.
 * 
 * @param {string} question - The question to ask the AI
 * @returns {Promise<{answer: string, id: number, timestamp: string}>} The AI response
 * @throws {Error} If the API call fails
 */
// PUBLIC_INTERFACE
export const askQuestion = async (question) => {
  if (!question || question.trim().length === 0) {
    throw new Error('Question cannot be empty');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: question.trim() }),
    });

    if (!response.ok) {
      // Try to extract error message from response
      let errorMessage = `API error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.detail) {
          errorMessage = typeof errorData.detail === 'string' 
            ? errorData.detail 
            : JSON.stringify(errorData.detail);
        }
      } catch (e) {
        // If parsing error response fails, use default message
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Re-throw with more context if it's a network error
    if (error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the backend. Please ensure the API server is running.');
    }
    throw error;
  }
};

export default { askQuestion };
