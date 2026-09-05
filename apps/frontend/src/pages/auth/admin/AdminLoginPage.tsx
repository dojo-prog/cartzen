import AdminLoginForm from "@/features/auth/components/AdminLoginForm";
import { ShoppingBasket } from "lucide-react";

const AdminLoginPage = () => {
  return (
    <div className="flex flex-col space-y-4 min-h-svh w-full items-center justify-center bg-background p-6 md:p-10">
      {/* Header */}
      <div className="w-max flex-col items-center justify-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary m-auto mb-1">
          <ShoppingBasket className="h-6 w-6 text-primary-foreground" />
        </div>

        <span className="text-xl font-semibold text-primary">
          Cartzen Admin
        </span>
      </div>

      <div className="w-full max-w-sm">
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default AdminLoginPage;
