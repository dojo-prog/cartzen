import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/admin/Sidebar";
import Navbar from "@/components/layout/admin/Navbar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-muted/20">
      <Sidebar />

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
