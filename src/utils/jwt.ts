import { jwtDecode } from "jwt-decode";

type Role = "OWNER" | "ADMIN" | "MEMBER";

type MembershipPayload = {
  workspaceId: string;
  role: Role;
};

export interface JWTPayload {
  id: string;
  name: string;
  emailVerified: boolean;
  memberships: MembershipPayload[];
  iat: number;
  exp: number;
}

export const decodeAccessToken = (token: string): JWTPayload => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    return {
      id: decoded.id,
      name: decoded.name,
      emailVerified: decoded.emailVerified,
      memberships: decoded.memberships,
      iat: decoded.iat,
      exp: decoded.exp,
    };
  } catch (error) {
    console.error("Failed to decode JWT token:", error);
    throw new Error("Failed to decode JWT token");
  }
};
