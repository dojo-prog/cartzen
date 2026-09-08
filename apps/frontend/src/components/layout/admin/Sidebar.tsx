import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/useLogout";

import {
  LogOut,
  Package,
  ShoppingCart,
  PanelLeftClose,
  PanelLeftOpen,
  ChartBarStacked,
} from "lucide-react";

import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const sidebarTabs = [
  {
    label: "Products",
    path: "/admin/products",
    Icon: Package,
  },
  {
    label: "Categories",
    path: "/admin/categories",
    Icon: ChartBarStacked,
  },
  {
    label: "Orders",
    path: "/admin/orders",
    Icon: ShoppingCart,
  },
];

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
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
    <aside
      className={`sticky top-0 flex h-screen shrink-0 flex-col border-r bg-background transition-[width] duration-200 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Brand */}
      <div
        className={`flex h-16 shrink-0 items-center border-b ${
          collapsed ? "justify-center" : "px-5"
        }`}
      >
        {collapsed ? (
          <Link to="/admin" className="text-lg font-bold tracking-tight">
            C
          </Link>
        ) : (
          <Link to="/admin" className="text-lg font-bold tracking-tight">
            Cartzen
            <span className="ml-1.5 text-xs font-medium text-muted-foreground">
              Admin
            </span>
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {sidebarTabs.map((tab) => (
          <NavItem
            key={tab.path}
            to={tab.path}
            icon={tab.Icon}
            label={tab.label}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* Footer */}
      <div>
        <div className="p-3">
          <Button
            variant="ghost"
            className={`h-10 w-full ${
              collapsed ? "justify-center" : "justify-start"
            }`}
            onClick={handleLogout}
          >
            <LogOut className="size-5 shrink-0" />

            {!collapsed && <span>Logout</span>}
          </Button>
        </div>

        <div className="shrink-0 border-t p-3">
          {/* Collapse */}
          <Button
            variant="ghost"
            className={`mt-1 h-10 w-full ${
              collapsed ? "justify-center" : "justify-start"
            }`}
            onClick={onToggle}
          >
            {collapsed ? (
              <PanelLeftOpen className="size-5" />
            ) : (
              <>
                <PanelLeftClose className="size-5" />
                <span>Collapse</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </aside>
  );
};

type NavItemProps = {
  to: string;
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
};

const NavItem = ({ to, icon: Icon, label, collapsed }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        [
          "flex items-center rounded-lg py-2.5 text-sm font-medium",
          "transition-colors",
          collapsed ? "justify-center px-2" : "gap-3 px-3",
          isActive
            ? "bg-primary/80 text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        ].join(" ")
      }
    >
      <Icon className="size-4 shrink-0" />

      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

export default Sidebar;
