import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import SplashScreen from ".//SplashScreen";

export default function ProtectedRoute() {
  const { initialized, isAuthenticated } = useAuthContext();

  if (!initialized) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
