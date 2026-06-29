// frontend/js/post.js
/**
 * Handles fetching a single post and its comments, and submitting new comments.
 */
import { apiRequest } from './api.js';

function getPostIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

async function loadPost() {
  const postId = getPostIdFromUrl();
  if (!postId) {
    document.getElementById('post-title').textContent = 'Post not found';
    return;
  }
  try {
    const post = await apiRequest(`/api/posts/${postId}`, 'GET');
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-author').textContent = `by ${post.author?.username || 'unknown'} on ${new Date(post.createdAt).toLocaleDateString()}`;
    document.getElementById('post-content').innerHTML = post.content;
    renderComments(post.comments || []);
  } catch (err) {
    console.error(err);
    document.getElementById('post-title').textContent = 'Error loading post';
  }
}

function renderComments(comments) {
  const list = document.getElementById('comment-list');
  if (comments.length === 0) {
    list.innerHTML = '<p class="info">No comments yet. Be the first to comment!</p>';
    return;
  }
  list.innerHTML = comments.map(c => `
    <div class="comment">
      <div class="author">${c.author?.username || 'anonymous'}</div>
      <div class="text">${c.text}</div>
    </div>`).join('');
}

async function submitComment(event) {
  event.preventDefault();
  const postId = getPostIdFromUrl();
  const text = document.getElementById('comment-text').value.trim();
  if (!text) return;
  try {
    await apiRequest('/api/comments', 'POST', { postId, text });
    // Reload comments
    const post = await apiRequest(`/api/posts/${postId}`, 'GET');
    renderComments(post.comments || []);
    document.getElementById('comment-text').value = '';
    showMessage('comment-message', 'Comment posted!', false);
  } catch (err) {
    showMessage('comment-message', err.message, true);
  }
}

function showMessage(elId, msg, isError) {
  const el = document.getElementById(elId);
  if (el) {
    el.textContent = msg;
    el.className = isError ? 'message error' : 'message success';
  }
}

// Initialise
document.addEventListener('DOMContentLoaded', () => {
  loadPost();
  const form = document.getElementById('comment-form');
  if (form) {
    form.addEventListener('submit', submitComment);
  }
});
