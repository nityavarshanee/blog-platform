import './Home.css';
import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({}); // postId => count
  const [comments, setComments] = useState({}); // postId => array of {author, text}
  const [newComment, setNewComment] = useState({}); // postId => text input

  useEffect(() => {
    // Fetch recent posts (limit to 3 for demo)
    fetch('http://localhost:5000/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data.slice(0, 3)))
      .catch((err) => console.error('Failed to load posts', err));
  }, []);

  const handleLike = (postId) => {
    setLikes((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1,
    }));
  };

  const handleCommentChange = (postId, text) => {
    setNewComment((prev) => ({ ...prev, [postId]: text }));
  };

  const addComment = (postId) => {
    const text = newComment[postId];
    if (!text) return;
    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), { author: 'you', text }],
    }));
    setNewComment((prev) => ({ ...prev, [postId]: '' }));
  };

  return (
    <main className="container">
      <h2>Welcome to Blog Platform</h2>
      <p>Browse recent posts below.</p>
      {posts.map((post) => (
        <article key={post._id} className="post-card">
          <h4>{post.title}</h4>
          <p className="post-meta">by {post.author?.username || 'unknown'}</p>
          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
          <button className="btn-like" onClick={() => handleLike(post._id)}>
            💖 {likes[post._id] || post.likes || 0} Like
          </button>
          <section className="comments">
            <h5>Comments</h5>
            {(comments[post._id] || []).map((c, i) => (
              <div key={i} className="comment">
                <strong>{c.author}:</strong> {c.text}
              </div>
            ))}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addComment(post._id);
              }}
            >
              <input
                value={newComment[post._id] || ''}
                onChange={(e) => handleCommentChange(post._id, e.target.value)}
                placeholder="Add a comment..."
                required
              />
              <button type="submit" className="btn-primary">
                Post
              </button>
            </form>
          </section>
        </article>
      ))}
    </main>
  );
}
