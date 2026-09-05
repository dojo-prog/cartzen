import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { LogOut, Package, ShoppingCart } from "lucide-react";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const sidebarTabs = [
  { label: "Products", path: "/admin/products", Icon: Package },
  { label: "Orders", path: "/admin/orders", Icon: ShoppingCart },
];

const Sidebar = () => {
  const { mutate: logout } = useLogout();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate("/admin/auth");
      },
    });
  };

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r bg-background">
      {/* Brand */}
      <div className="flex h-16 items-center border-b px-5">
        <Link to="/admin" className="text-lg font-bold tracking-tight">
          Cartzen
          <span className="ml-1.5 text-xs font-medium text-muted-foreground">
            Admin
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {sidebarTabs.map((tab) => (
          <NavItem to={tab.path} icon={tab.Icon} label={tab.label} />
        ))}
      </nav>

      {/* Sidebar footer */}
      <div className="border-t h-16 p-3">
        <Button
          variant={"ghost"}
          className={"w-full h-full"}
          onClick={handleLogout}
        >
          <LogOut className="size-5" />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
};

type NavItemProps = {
  to: string;
  icon: React.ElementType;
  label: string;
};

const NavItem = ({ to, icon: Icon, label }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
          "transition-colors",
          isActive
            ? "bg-primary/80 text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        ].join(" ")
      }
    >
      <Icon className="size-4" />
      <span>{label}</span>
    </NavLink>
  );
};

export default Sidebar;
