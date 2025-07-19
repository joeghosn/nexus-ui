import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "../types/api";

export const workspaceApi = createApi({
  reducerPath: "workspaceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/",
    credentials: "include",
  }),
  tagTypes: ["Workspace"],
  endpoints: (builder) => ({
    createWorkspace: builder.mutation<
      ApiResponse<{
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
      }>,
      { name: string }
    >({
      query: (body) => ({
        url: "workspaces",
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, error) => (error ? [] : ["Workspace"]),
    }),
    getUserWorkspaces: builder.query<
      ApiResponse<
        Array<{
          id: string;
          name: string;
          createdAt: string;
          updatedAt: string;
          members: Array<{ role: string }>;
        }>
      >,
      void
    >({
      query: () => ({
        url: "workspaces",
        method: "GET",
      }),
      providesTags: ["Workspace"],
    }),
    getWorkspaceById: builder.query<
      ApiResponse<{
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
      }>,
      string
    >({
      query: (workspaceId) => ({
        url: `workspaces/${workspaceId}`,
        method: "GET",
      }),
      providesTags: (_, __, workspaceId) => [
        { type: "Workspace", id: workspaceId },
      ],
    }),
    updateWorkspace: builder.mutation<
      ApiResponse<{
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
      }>,
      { workspaceId: string; name: string }
    >({
      query: ({ workspaceId, name }) => ({
        url: `workspaces/${workspaceId}`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: (_result, error, { workspaceId }) =>
        error ? [] : [{ type: "Workspace", id: workspaceId }, "Workspace"],
    }),
    deleteWorkspace: builder.mutation<ApiResponse<null>, string>({
      query: (workspaceId) => ({
        url: `workspaces/${workspaceId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, error, workspaceId) =>
        error ? [] : [{ type: "Workspace", id: workspaceId }, "Workspace"],
    }),
  }),
});

export const {
  useCreateWorkspaceMutation,
  useGetUserWorkspacesQuery,
  useGetWorkspaceByIdQuery,
  useUpdateWorkspaceMutation,
  useDeleteWorkspaceMutation,
} = workspaceApi;
