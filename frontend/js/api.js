// frontend/js/api.js
/**
 * Helper for making API requests with optional JWT authentication.
 * @param {string} endpoint - API endpoint path starting with '/api/'.
 * @param {string} method - HTTP method, default GET.
 * @param {object} [data] - Body payload for POST/PUT/PATCH.
 * @returns {Promise<any>} - Parsed JSON response or throws error.
 */
export async function apiRequest(endpoint, method = 'GET', data) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(endpoint, options);
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'API error');
  }
  // Some DELETE endpoints may not return JSON
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }
  return null;
}
