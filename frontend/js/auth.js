// frontend/js/auth.js
/**
 * Handles login and signup form submissions.
 * Stores JWT token in localStorage on success.
 */
export function initAuthForms() {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = loginForm.username.value.trim();
      const password = loginForm.password.value;
      try {
        const data = await apiRequest('/api/auth/login', 'POST', { username, password });
        localStorage.setItem('token', data.token);
        // Redirect to home page after successful login
        window.location.href = 'index.html';
      } catch (err) {
        showMessage('login-message', err.message, true);
      }
    });
  }

  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = signupForm.username.value.trim();
      const email = signupForm.email.value.trim();
      const password = signupForm.password.value;
      try {
        const data = await apiRequest('/api/auth/register', 'POST', { username, email, password });
        localStorage.setItem('token', data.token);
        // Redirect to login page after successful signup
        window.location.href = 'login.html';
      } catch (err) {
        showMessage('signup-message', err.message, true);
      }
    });
  }
}

function showMessage(elementId, msg, isError) {
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = msg;
    el.className = isError ? 'message error' : 'message success';
  }
}

// Export for other scripts if needed
export { showMessage };
