import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth.service";
import { workspaceApi } from "./workspace.service";
import { membersApi } from "./members.service";
// import { boardApi } from "./board.service";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [workspaceApi.reducerPath]: workspaceApi.reducer,
    [membersApi.reducerPath]: membersApi.reducer,
    // [boardApi.reducerPath]: boardApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      workspaceApi.middleware,
      membersApi.middleware
      // boardApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
