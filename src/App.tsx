import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { Loader } from "./components/loader";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Invite from "./pages/auth/Invite";
// Dashboard/Protected pages
import Dashboard from "./pages/dashboard/Dashboard";
import Account from "./pages/dashboard/Account";
import Workspaces from "./pages/dashboard/Workspaces";
import WorkspaceSettings from "./pages/workspaces/WorkspaceSettings";
import Board from "./pages/workspaces/Board";

function App() {
  return (
    <Router>
      <Loader>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/invite/:token" element={<Invite />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="/workspaces"
              element={
                <ProtectedRoute>
                  <Workspaces />
                </ProtectedRoute>
              }
            />
            <Route
              path="/workspaces/:workspaceId/boards/:boardId"
              element={
                <ProtectedRoute>
                  <Board />
                </ProtectedRoute>
              }
            />
            <Route
              path="/workspaces/:workspaceId/settings"
              element={
                <ProtectedRoute>
                  <WorkspaceSettings />
                </ProtectedRoute>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Loader>
    </Router>
  );
}

export default App;
