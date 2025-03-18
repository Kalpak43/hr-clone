import { Routes } from "react-router";
import "./App.css";
import Layout from "./Layout";
import { Route } from "react-router";
import HomePage from "./pages/HomePage";
import EmployeesPage from "./pages/EmployeesPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/employees" element={<EmployeesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
