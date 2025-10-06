/**
 * API Service for communicating with the backend
 * Handles all HTTP requests to the FastAPI backend
 * 
 * Configuration:
 * - Uses REACT_APP_BACKEND_URL environment variable
 * - Default fallback: http://localhost:3001
 * - Includes proper error handling for network issues
 * 
 * Important: Restart the React dev server after changing .env variables
 */

// Get backend URL from environment variable with fallback, remove trailing slash
const API_BASE_URL = (process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001').replace(/\/$/, '');

// Log once (avoid noisy logs during dev HMR)
if (typeof window !== 'undefined' && !window.__API_BASE_URL_LOGGED__) {
  console.log('API Base URL:', API_BASE_URL);
  window.__API_BASE_URL_LOGGED__ = true;
}

// PUBLIC_INTERFACE
/**
 * Ask a question to the AI
 * @param {string} question - The question to ask
 * @returns {Promise<Object>} Response object containing answer, id, and created_at
 * @throws {Error} If the request fails or returns an error
 */
export async function askQuestion(question) {
  const url = `${API_BASE_URL}/ask`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error ${res.status}: ${text}`);
    }

    const data = await res.json();
    
    // Validate response structure
    if (!data.answer) {
      throw new Error('Invalid response format from server');
    }
    
    return data;
  } catch (err) {
    console.error('askQuestion failed:', err);
    
    // Handle network errors
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Cannot connect to backend. Please ensure the backend service is running.');
    }
    
    throw err;
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
    const response = await fetch(`${API_BASE_URL}/health`, {
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

export default { askQuestion, healthCheck };
