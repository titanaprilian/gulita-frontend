import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");
  return accessToken && refreshToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
