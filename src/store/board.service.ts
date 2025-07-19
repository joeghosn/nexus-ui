// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { ApiResponse } from "../types/api";

// export const boardApi = createApi({
//   reducerPath: "boardApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/",
//     credentials: "include",
//   }),
//   tagTypes: ["Board", "BoardMember"],
//   endpoints: (builder) => ({
//     createBoard: builder.mutation<
//       ApiResponse<{
//         id: string;
//         name: string;
//         visibility: string;
//         workspaceId: string;
//       }>,
//       { workspaceId: string; name: string; visibility: string }
//     >({
//       query: ({ workspaceId, ...body }) => ({
//         url: `workspaces/${workspaceId}/boards`,
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: (_result, error, { workspaceId }) =>
//         error ? [] : [{ type: "Board", id: workspaceId }],
//     }),
//     getBoardsInWorkspace: builder.query<
//       ApiResponse<
//         Array<{
//           id: string;
//           name: string;
//           visibility: string;
//         }>
//       >,
//       { workspaceId: string }
//     >({
//       query: ({ workspaceId }) => ({
//         url: `workspaces/${workspaceId}/boards`,
//         method: "GET",
//       }),
//       providesTags: (_, __, { workspaceId }) => [
//         { type: "Board", id: workspaceId },
//       ],
//     }),
//     getBoardById: builder.query<
//       ApiResponse<{
//         id: string;
//         name: string;
//         visibility: string;
//         lists: Array<{
//           id: string;
//           name: string;
//           position: number;
//           cards: Array<any>;
//         }>;
//       }>,
//       { workspaceId: string; boardId: string }
//     >({
//       query: ({ workspaceId, boardId }) => ({
//         url: `workspaces/${workspaceId}/boards/${boardId}`,
//         method: "GET",
//       }),
//       providesTags: (_, __, { boardId }) => [{ type: "Board", id: boardId }],
//     }),
//     updateBoard: builder.mutation<
//       ApiResponse<{
//         id: string;
//         name: string;
//         visibility: string;
//       }>,
//       {
//         workspaceId: string;
//         boardId: string;
//         name?: string;
//         visibility?: string;
//       }
//     >({
//       query: ({ workspaceId, boardId, ...body }) => ({
//         url: `workspaces/${workspaceId}/boards/${boardId}`,
//         method: "PATCH",
//         body,
//       }),
//       invalidatesTags: (_result, error, { workspaceId, boardId }) =>
//         error
//           ? []
//           : [
//               { type: "Board", id: boardId },
//               { type: "Board", id: workspaceId },
//             ],
//     }),
//     deleteBoard: builder.mutation<
//       ApiResponse<{ message: string }>,
//       { workspaceId: string; boardId: string }
//     >({
//       query: ({ workspaceId, boardId }) => ({
//         url: `workspaces/${workspaceId}/boards/${boardId}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: (_result, error, { workspaceId, boardId }) =>
//         error
//           ? []
//           : [
//               { type: "Board", id: boardId },
//               { type: "Board", id: workspaceId },
//             ],
//     }),
//     addMemberToBoard: builder.mutation<
//       ApiResponse<{
//         id: string;
//         boardId: string;
//         userId: string;
//       }>,
//       { workspaceId: string; boardId: string; userId: string }
//     >({
//       query: ({ workspaceId, boardId, userId }) => ({
//         url: `workspaces/${workspaceId}/boards/${boardId}/members`,
//         method: "POST",
//         body: { userId },
//       }),
//       invalidatesTags: (_result, error, { boardId }) =>
//         error ? [] : [{ type: "BoardMember", id: boardId }],
//     }),
//     removeMemberFromBoard: builder.mutation<
//       ApiResponse<{ message: string }>,
//       { workspaceId: string; boardId: string; userId: string }
//     >({
//       query: ({ workspaceId, boardId, userId }) => ({
//         url: `workspaces/${workspaceId}/boards/${boardId}/members/${userId}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: (_result, error, { boardId }) =>
//         error ? [] : [{ type: "BoardMember", id: boardId }],
//     }),
//   }),
// });

// export const {
//   useCreateBoardMutation,
//   useGetBoardsInWorkspaceQuery,
//   useGetBoardByIdQuery,
//   useUpdateBoardMutation,
//   useDeleteBoardMutation,
//   useAddMemberToBoardMutation,
//   useRemoveMemberFromBoardMutation,
// } = boardApi;
