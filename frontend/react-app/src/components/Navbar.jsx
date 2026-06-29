import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <header className="navbar">
      <h1 className="logo">
        <Link to="/">🖤🟣 Blog Platform</Link>
      </h1>
      <nav className="nav-links" id="nav-links">
        <Link to="/" id="nav-home">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" id="nav-dashboard">Dashboard</Link>
            <Link to="/create" id="nav-create">Create Post</Link>
            <Link to="/logout" id="nav-logout" onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login" id="nav-login">Login</Link>
            <Link to="/signup" id="nav-signup">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}
