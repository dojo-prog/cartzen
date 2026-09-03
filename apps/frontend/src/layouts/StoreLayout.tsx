import Header from "@/components/layout/Header";
import { Outlet } from "react-router-dom";

const StoreLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="pt-16 flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StoreLayout;
