import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <section className="container">
      <h2>Dashboard</h2>
      <p>Your posts will appear here.</p>
      <button className="btn-primary" onClick={() => navigate('/create')}>
        Create New Post
      </button>
    </section>
  );
}
