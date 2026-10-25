import { Outlet } from "react-router";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";

export default function AppLayout() {
  return (
    <div className="components-layout">
      <Sidebar />
      <Navbar />
      
      <main className="min-h-screen min-w-0 px-4 pb-6 pt-24 sm:ml-64 md:px-6">
        <Outlet />
      </main>
    </div>
  );
}
