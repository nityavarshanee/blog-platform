import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Placeholder: simulate fetching a post
    const fakePost = {
      title: `Post #${id}`,
      author: { username: 'demoUser' },
      createdAt: new Date().toISOString(),
      content: '<p>This is a placeholder post content for post ID ' + id + '.</p>',
      comments: [],
    };
    setPost(fakePost);
  }, [id]);

  const submitComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    const newComment = { author: { username: 'you' }, text: comment };
    setPost((p) => ({ ...p, comments: [...p.comments, newComment] }));
    setComment('');
    setMessage('Comment posted!');
    setTimeout(() => setMessage(null), 3000);
  };

  if (!post) return <p>Loading...</p>;

  return (
    <section className="container">
      <h2>{post.title}</h2>
      <p className="post-meta">
        by {post.author?.username} on {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <article className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      <h3>Comments</h3>
      <div className="comment-list">
        {post.comments.length === 0 && <p className="info">No comments yet.</p>}
        {post.comments.map((c, i) => (
          <div className="comment" key={i}>
            <div className="author">{c.author?.username}</div>
            <div className="text">{c.text}</div>
          </div>
        ))}
      </div>
      <form className="auth-section" onSubmit={submitComment}>
        <textarea
          id="comment-text"
          rows="3"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          style={{ width: '100%' }}
        />
        <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>
          Post Comment
        </button>
        {message && <p className="message success">{message}</p>}
      </form>
    </section>
  );
}
