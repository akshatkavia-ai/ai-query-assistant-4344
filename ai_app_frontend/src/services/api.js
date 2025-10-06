/**
 * API Service for communicating with the backend
 * Handles all HTTP requests to the FastAPI backend
 * 
 * Configuration:
 * - Uses REACT_APP_BACKEND_URL environment variable
 * - Default fallback: http://localhost:3001
 * - Includes timeout and error handling for network issues
 * 
 * Important: Restart the React dev server after changing .env variables
 */

// Get backend URL from environment variable with fallback
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

// Log the API URL being used (helps with debugging)
console.log('API Base URL:', API_BASE_URL);
=======

// PUBLIC_INTERFACE
/**
 * Ask a question to the AI
 * @param {string} question - The question to ask
 * @returns {Promise<Object>} Response object containing answer, id, and created_at
 * @throws {Error} If the request fails or returns an error
 */
export async function askQuestion(question) {
  try {
    const response = await fetch(`${API_BASE_URL}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server returned non-JSON response. Please check the backend service.');
    }

    const data = await response.json();

    // Handle HTTP errors
    if (!response.ok) {
      // Check if error response has expected format
      if (data.error) {
        throw new Error(data.error);
      } else if (data.detail) {
        throw new Error(data.detail);
      } else {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
    }

    // Validate response structure
    if (!data.answer) {
      throw new Error('Invalid response format from server');
    }

    return data;
  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Cannot connect to backend. Please ensure the backend service is running.');
    }
    
    // Re-throw other errors
    throw error;
  }
}

// PUBLIC_INTERFACE
/**
 * Health check endpoint to verify backend connectivity
 * @returns {Promise<Object>} Health check response
 * @throws {Error} If the health check fails
 */
export async function healthCheck() {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Health check failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Cannot connect to backend service');
    }
    throw error;
  }
}
