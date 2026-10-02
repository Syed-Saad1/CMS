import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const role = Cookies.get("role", role);
  if (role === "user") {
  }
  const token = Cookies.get("accesstoken");
  if (!token) {
    return <Navigate to={"/auth/login"} replace />;
  }
  if (token) {
    return <Navigate to={"/admin/dashboard"} replace />;
  }
  return <Outlet />;
}
