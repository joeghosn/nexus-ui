import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "../types/api";

export const membersApi = createApi({
  reducerPath: "membersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/",
    credentials: "include",
  }),
  tagTypes: ["Member", "Invite"],
  endpoints: (builder) => ({
    inviteMember: builder.mutation<
      ApiResponse<{ email: string; role: string }>,
      { workspaceId: string; email: string; role: string }
    >({
      query: ({ workspaceId, ...body }) => ({
        url: `workspaces/${workspaceId}/members/invite`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, error, { workspaceId }) =>
        error ? [] : [{ type: "Invite", id: workspaceId }],
    }),
    getPendingInvites: builder.query<
      ApiResponse<
        Array<{ id: string; email: string; role: string; expiresAt: string }>
      >,
      { workspaceId: string }
    >({
      query: ({ workspaceId }) => ({
        url: `workspaces/${workspaceId}/members/invites`,
        method: "GET",
      }),
      providesTags: (_, __, { workspaceId }) => [
        { type: "Invite", id: workspaceId },
      ],
    }),
    getWorkspaceMembers: builder.query<
      ApiResponse<
        Array<{
          id: string;
          role: string;
          userId: string;
          workspaceId: string;
          createdAt: string;
          updatedAt: string;
          user: { id: string; name: string; email: string };
        }>
      >,
      { workspaceId: string }
    >({
      query: ({ workspaceId }) => ({
        url: `workspaces/${workspaceId}/members`,
        method: "GET",
      }),
      providesTags: (_, __, { workspaceId }) => [
        { type: "Member", id: workspaceId },
      ],
    }),
    updateMemberRole: builder.mutation<
      ApiResponse<{
        id: string;
        role: string;
        userId: string;
        workspaceId: string;
        createdAt: string;
        updatedAt: string;
      }>,
      { workspaceId: string; membershipId: string; role: string }
    >({
      query: ({ workspaceId, membershipId, role }) => ({
        url: `workspaces/${workspaceId}/members/${membershipId}`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: (_result, error, { workspaceId }) =>
        error ? [] : [{ type: "Member", id: workspaceId }],
    }),
    removeMember: builder.mutation<
      ApiResponse<null>,
      { workspaceId: string; membershipId: string }
    >({
      query: ({ workspaceId, membershipId }) => ({
        url: `workspaces/${workspaceId}/members/${membershipId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, error, { workspaceId }) =>
        error ? [] : [{ type: "Member", id: workspaceId }],
    }),
    verifyInviteToken: builder.query<
      ApiResponse<{
        email: string;
        workspaceName: string;
      }>,
      { token: string }
    >({
      query: ({ token }) => ({
        url: `invites/verify/${token}`,
        method: "GET",
      }),
      providesTags: (_, __, { token }) => [{ type: "Invite", id: token }],
    }),
    acceptInvite: builder.mutation<ApiResponse<null>, { token: string }>({
      query: (body) => ({
        url: `invites/accept`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, error, { token }) =>
        error ? [] : [{ type: "Invite", id: token }, "Member"],
    }),
  }),
});

export const {
  useInviteMemberMutation,
  useGetPendingInvitesQuery,
  useGetWorkspaceMembersQuery,
  useUpdateMemberRoleMutation,
  useRemoveMemberMutation,
  useVerifyInviteTokenQuery,
  useAcceptInviteMutation,
} = membersApi;
