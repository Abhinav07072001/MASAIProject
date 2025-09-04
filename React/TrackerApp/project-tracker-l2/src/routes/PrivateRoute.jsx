import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function PrivateRoute({ children }) {
  const { user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  return children;
}
