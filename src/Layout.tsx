import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router";

function Layout() {
  return (
    <main className="flex divide-x divide-gray-300 h-screen">
      <Sidebar />
      <div className="w-full lg:w-4/5 xl:w-5/6 h-full flex flex-col">
        <Header />
        <Outlet />
      </div>
    </main>
  );
}

export default Layout;
