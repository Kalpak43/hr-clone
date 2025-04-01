import { Routes } from "react-router";
import "./App.css";
import Layout from "./Layout";
import { Route } from "react-router";
import HomePage from "./pages/HomePage";
import EmployeesPage from "./pages/EmployeesPage";
import AttendancePage from "./pages/AttendancePage";
import InboxPage from "./pages/InboxPage";
import PayrollPage from "./pages/PayrollPage";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect } from "react";
import { supabase } from "./supbase";
import { authChanged } from "./features/auth/authThunk";
import LoginPage from "./pages/LoginPage";
import {
  AdminProtectedRoute,
  UserProtectedRoute,
} from "./components/auth/ProtectedRoute";
import { toast } from "sonner";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import AccessPage from "./pages/AccessPage";
import HiringPage from "./pages/HiringPage";
import CalendarPage from "./pages/CalendarPage";

function App() {
  const dispatch = useAppDispatch();
  const { user, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        const currentUser = session?.user ?? null;
        let isAdmin = false;
        if (currentUser) {
          isAdmin = currentUser.app_metadata.role === "admin";
        }

        dispatch(
          authChanged({
            user: currentUser,
            isAdmin: isAdmin,
          })
        );
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    if (user) toast.success("Logged in Successfully");
  }, [user]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);
  return (
    <Routes>
      <Route element={<UserProtectedRoute />}>
        <Route element={<Layout />}>
          <Route element={<AdminProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/inbox/:mailID?" element={<InboxPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/payroll" element={<PayrollPage />} />
            <Route path="/hiring" element={<HiringPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/manage-access" element={<AccessPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/update-password" element={<UpdatePasswordPage />} />
    </Routes>
  );
}

export default App;
