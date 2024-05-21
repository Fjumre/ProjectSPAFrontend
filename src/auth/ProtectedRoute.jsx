import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ isAuthenticated, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return null; // Or a loading spinner, etc.
}

export default ProtectedRoute;
