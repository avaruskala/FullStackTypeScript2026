import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../store/StoreHooks";


export function AdminRoute() {
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth
  );


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
