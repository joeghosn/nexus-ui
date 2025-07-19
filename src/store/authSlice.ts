import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./auth.service";
import { decodeAccessToken } from "../utils/jwt";

type Role = "OWNER" | "ADMIN" | "MEMBER";

type MembershipPayload = {
  workspaceId: string;
  role: Role;
};

interface User {
  id: string;
  name: string;
  emailVerified: boolean;
  memberships: MembershipPayload[];
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isRefreshing: boolean;
  exp: number | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  isAuthenticated: false,
  isRefreshing: true,
  exp: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isRefreshing = false;
      state.exp = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        const responseData = action.payload.data;

        // Check if response contains accessToken (verified user) or just email (needs verification)
        if ("accessToken" in responseData) {
          const { accessToken } = responseData;

          state.accessToken = accessToken;
          state.isAuthenticated = true;
          state.isRefreshing = false;

          const decoded = decodeAccessToken(accessToken);
          state.user = {
            id: decoded.id,
            name: decoded.name,
            emailVerified: decoded.emailVerified,
            memberships: decoded.memberships,
          };
          state.exp = decoded.exp;
        } else {
          state.isRefreshing = false;
        }
      })
      .addMatcher(authApi.endpoints.refresh.matchFulfilled, (state, action) => {
        const { accessToken } = action.payload.data;

        state.accessToken = accessToken;
        state.isAuthenticated = true;
        state.isRefreshing = false;

        const decoded = decodeAccessToken(accessToken);
        state.user = {
          id: decoded.id,
          name: decoded.name,
          emailVerified: decoded.emailVerified,
          memberships: decoded.memberships,
        };
        state.exp = decoded.exp;
      })
      .addMatcher(
        authApi.endpoints.verifyEmail.matchFulfilled,
        (state, action) => {
          const { accessToken } = action.payload.data;

          state.accessToken = accessToken;
          state.isAuthenticated = true;
          state.isRefreshing = false;

          const decoded = decodeAccessToken(accessToken);
          state.user = {
            id: decoded.id,
            name: decoded.name,
            emailVerified: decoded.emailVerified,
            memberships: decoded.memberships,
          };
          state.exp = decoded.exp;
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.accessToken = null;
        state.user = null;
        state.isAuthenticated = false;
        state.isRefreshing = false;
        state.exp = null;
      })
      .addMatcher(authApi.endpoints.refresh.matchRejected, (state) => {
        state.accessToken = null;
        state.user = null;
        state.isAuthenticated = false;
        state.isRefreshing = false;
        state.exp = null;
      });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
