import { Routes } from "react-router";
import "./App.css";
import Layout from "./Layout";
import { Route } from "react-router";
import HomePage from "./pages/HomePage";
import EmployeesPage from "./pages/EmployeesPage";
import AttendancePage from "./pages/AttendancePage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
      </Route>
    </Routes>
  );
}

export default App;
