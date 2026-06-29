// frontend/js/home.js
// Fetches all posts and renders them in the #posts-container element.
import { getAuthHeader } from './api.js';

async function fetchPosts() {
  try {
    const response = await fetch('/api/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const posts = await response.json();
    renderPosts(posts);
  } catch (err) {
    console.error(err);
    const container = document.getElementById('posts-container');
    container.innerHTML = '<p class="error">Unable to load posts.</p>';
  }
}

function renderPosts(posts) {
  const container = document.getElementById('posts-container');
  if (!Array.isArray(posts) || posts.length === 0) {
    container.innerHTML = '<p class="info">No posts yet. Be the first to create one!</p>';
    return;
  }
  const list = posts.map(post => {
    const title = `<h2 class="post-title"><a href="post.html?id=${post._id}">${post.title}</a></h2>`;
    const author = `<p class="post-meta">by ${post.author?.username || 'unknown'} on ${new Date(post.createdAt).toLocaleDateString()}</p>`;
    const excerpt = `<p class="post-excerpt">${post.content.substring(0, 150)}...</p>`;
    const stats = `<span class="post-stats">👍 ${post.likes || 0} 💬 ${post.comments?.length || 0}</span>`;
    return `<div class="post-card fade-in">${title}${author}${excerpt}${stats}</div>`;
  }).join('');
  container.innerHTML = `<div class="posts-grid">${list}</div>`;
}

// Initialise on DOM ready
document.addEventListener('DOMContentLoaded', fetchPosts);
