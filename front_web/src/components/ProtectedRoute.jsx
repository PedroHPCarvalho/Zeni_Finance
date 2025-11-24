// ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token); // true/false
  }, [location.pathname]); // verifica a CADA mudança de rota

  if (isAuth === null) {
    return null; // evita piscar o layout
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
