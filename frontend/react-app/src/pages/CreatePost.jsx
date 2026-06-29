import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Placeholder: replace with real API call to create post
    console.log('Creating post', { title, content });
    // After creation, go to dashboard or home
    navigate('/dashboard');
  };

  return (
    <section className="auth-section">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label htmlFor="content">Content</label>
        <textarea id="content" rows="6" value={content} onChange={(e) => setContent(e.target.value)} required />
        <button type="submit" className="btn-primary">Publish</button>
      </form>
    </section>
  );
}
