import { useAppSelector } from "../../app/hooks";
import { Navigate, Outlet } from "react-router";

export function UserProtectedRoute() {
  const { user } = useAppSelector((state) => state.auth);

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
export function AdminProtectedRoute() {
  const { user, isAdmin } = useAppSelector((state) => state.auth);

  return user && isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
}
