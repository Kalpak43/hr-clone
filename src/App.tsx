import { Routes } from "react-router";
import "./App.css";
import Layout from "./Layout";
import { Route } from "react-router";
import HomePage from "./pages/HomePage";
import EmployeesPage from "./pages/EmployeesPage";
import AttendancePage from "./pages/AttendancePage";
import InboxPage from "./pages/InboxPage";
import PayrollPage from "./pages/PayrollPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/payroll" element={<PayrollPage />} />
        <Route path="/inbox/:mailID?" element={<InboxPage />} />
      </Route>
    </Routes>
  );
}

export default App;
