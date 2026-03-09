import { Link, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EventDetail from './pages/EventDetail';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <p>Chargement de la session...</p>;
  }

  return (
    <div>
      <header style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
        <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/">Accueil</Link>
          {user ? (
            <>
              <span>Connecté: {user.username}</span>
              <button type="button" onClick={logout}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Connexion</Link>
              <Link to="/register">Inscription</Link>
            </>
          )}
        </nav>
      </header>

      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
