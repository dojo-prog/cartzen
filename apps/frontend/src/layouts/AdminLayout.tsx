import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/admin/Sidebar";
import Navbar from "@/components/layout/admin/Navbar";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="flex min-h-screen w-full bg-muted/20">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((prev) => !prev)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />

        <main className="min-w-0 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
