import React from "react";
import { useAppSelector } from "../store/hooks";
import { isTokenExpired } from "../utils/token-expiry";
import { cn } from "../utils/cn";

type UserRole = "OWNER" | "ADMIN" | "MEMBER";

interface AuthorizedProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  workspaceId?: string; // Optional workspace ID to check role for specific workspace
  fallbackType?: "hide" | "text" | "image";
  fallbackContent?: React.ReactNode;
  unauthorizedText?: string;
  unauthorizedImage?: {
    src: string;
    alt: string;
    className?: string;
  };
}

const Authorized: React.FC<AuthorizedProps> = ({
  children,
  allowedRoles,
  workspaceId,
  fallbackType = "hide",
  fallbackContent,
  unauthorizedText = "You don't have permission to access this content",
  unauthorizedImage,
}) => {
  const { user, isAuthenticated, exp } = useAppSelector((state) => state.auth);

  // Check if user is authenticated and token is not expired
  if (!isAuthenticated || isTokenExpired(exp) || !user) {
    return null;
  }

  // Check if user has required role
  let hasPermission = false;

  if (workspaceId) {
    // Check role for specific workspace
    const membership = user.memberships.find(
      (m) => m.workspaceId === workspaceId
    );
    hasPermission = membership ? allowedRoles.includes(membership.role) : false;
  } else {
    // Check if user has any of the allowed roles in any workspace
    hasPermission = user.memberships.some((membership) =>
      allowedRoles.includes(membership.role)
    );
  }

  if (hasPermission) {
    return <>{children}</>;
  }

  // Handle unauthorized access based on fallback type
  switch (fallbackType) {
    case "hide":
      return null;

    case "text":
      if (fallbackContent) {
        return <>{fallbackContent}</>;
      }
      return <div className="">{unauthorizedText}</div>;

    case "image":
      if (fallbackContent) {
        return <>{fallbackContent}</>;
      }
      if (unauthorizedImage) {
        return (
          <div className="">
            <img
              src={unauthorizedImage.src}
              alt={unauthorizedImage.alt}
              className={cn("", unauthorizedImage.className)}
            />
            <p className="">{unauthorizedText}</p>
          </div>
        );
      }
      // If no image provided and no fallbackContent, just show text
      return (
        <div className="text-text-subtle text-sm italic text-center">
          {unauthorizedText}
        </div>
      );

    default:
      return null;
  }
};

export default Authorized;
