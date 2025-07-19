import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "../types/api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/",
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    register: builder.mutation<
      ApiResponse<{ name: string; email: string }>,
      { name: string; email: string; password: string }
    >({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<
      ApiResponse<{ email: string } | { accessToken: string }>,
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    sendVerificationEmail: builder.mutation<
      ApiResponse<{ email: string }>,
      { email: string }
    >({
      query: (body) => ({
        url: "auth/send-verification-email",
        method: "POST",
        body,
      }),
    }),
    verifyEmail: builder.mutation<
      ApiResponse<{ accessToken: string }>,
      { email: string; token: string }
    >({
      query: (body) => ({
        url: "auth/verify-email",
        method: "POST",
        body,
      }),
    }),
    getMe: builder.query<
      ApiResponse<{
        id: string;
        email: string;
        name: string;
        emailVerified: boolean;
        createdAt: string;
      }>,
      void
    >({
      query: () => ({
        url: "auth/me",
        method: "GET",
      }),
    }),
    forgotPassword: builder.mutation<
      ApiResponse<{ email: string }>,
      { email: string }
    >({
      query: (body) => ({
        url: "auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<
      ApiResponse<null>,
      { token: string; password: string }
    >({
      query: (body) => ({
        url: "auth/reset-password",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
    refresh: builder.mutation<ApiResponse<{ accessToken: string }>, void>({
      query: () => ({
        url: "auth/refresh",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendVerificationEmailMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetMeQuery,
  useLogoutMutation,
  useRefreshMutation,
} = authApi;
