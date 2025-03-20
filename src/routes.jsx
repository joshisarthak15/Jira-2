import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./rbac/ProtectedRoute";
import { useAuth } from "./rbac/AuthContext";

const AppRoutes = () => {
  const { user } = useAuth(); // ✅ Get user from AuthContext
  console.log(user);
  
  return (
    <Router>
      <Routes>
        {/* 🔒 Redirect logged-in users away from signup/login */}
        <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <SignupPage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />

        {/* 🔒 Protect routes under ProtectedRoute */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* 🔥 Redirect unknown routes */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/signup"} replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
