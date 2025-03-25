import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./rbac/ProtectedRoute";
import { useAuth } from "./rbac/AuthContext";

const AppRoutes = () => {
  const { user, userRole } = useAuth(); // ✅ Get user & role from AuthContext
  console.log("User Role:", userRole);

  return (
    <Router>
      <Routes>
        {/* 🔒 Public Routes (Only accessible when NOT logged in) */}
        {!user && (
          <>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<SignupPage />} />
          </>
        )}

        {/* 🔒 General Protected Routes (All authenticated users) */}
        <Route element={<ProtectedRoute allowedRoles={["admin", "user"]} />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* 🛠️ Admin Panel (Only Admins Can Access) */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>

        {/* 🔥 Redirect unknown routes */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/signup"} replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
