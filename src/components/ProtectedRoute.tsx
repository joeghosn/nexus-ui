import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { isTokenExpired } from "../utils/token-expiry";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const exp = useAppSelector((state) => state.auth.exp);

  if (!isAuthenticated || isTokenExpired(exp)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
