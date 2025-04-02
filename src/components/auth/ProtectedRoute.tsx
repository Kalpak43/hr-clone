import { useAppSelector } from "../../app/hooks";
import { Navigate, Outlet, useLocation } from "react-router";

export function UserProtectedRoute() {
  const { user } = useAppSelector((state) => state.auth);

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
export function AdminProtectedRoute() {
  const location = useLocation();
  const allowedRoutes = useAppSelector((state) => state.routes.allowedRoutes);
  const loading = useAppSelector((state) => state.routes.loading);

  if (loading) {
    return <div className="hero h-full flex items-center justify-center">Loading..</div>;
  }

  if (!allowedRoutes.includes(location.pathname)) {
    console.log(location.pathname);
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
