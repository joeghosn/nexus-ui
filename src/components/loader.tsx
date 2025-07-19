import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { useLogoutMutation, useRefreshMutation } from "../store/api";
import { isTokenExpired } from "../utils/token-expiry";

interface LoaderProps {
  children: ReactNode;
}

export const Loader = ({ children }: LoaderProps) => {
  const navigate = useNavigate();
  const isRefreshing = useAppSelector((state) => state.auth.isRefreshing);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const exp = useAppSelector((state) => state.auth.exp);
  const [refresh] = useRefreshMutation();
  const [logout] = useLogoutMutation();
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only run once on app initialization
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    (async () => {
      // If user is authenticated but token is expired, logout
      if (isAuthenticated && accessToken && isTokenExpired(exp)) {
        console.log(
          "Token expired, clearing auth state and redirecting to login"
        );
        await logout();
        navigate("/login");
        return;
      }

      // Only try to refresh if we don't have a valid token and we're not already authenticated
      if (!isAuthenticated && !accessToken) {
        try {
          await refresh().unwrap();
        } catch (err) {
          console.error("Could not refresh token", err);
        }
      }
    })();
  });

  if (isRefreshing) {
    return <div className="f"></div>;
  }

  return <div className="w-full">{children}</div>;
};

export default Loader;
