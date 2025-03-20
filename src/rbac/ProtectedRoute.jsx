import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../rbac/AuthContext";
import AppRoutes from "../routes";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, provider } = useAuth();
  return user ? <Outlet/> : <Navigate to="/signup" replace/>
};

export default ProtectedRoute;
