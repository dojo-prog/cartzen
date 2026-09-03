import { LogIn, LogOut, ShoppingBasket, ShoppingCart } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { Badge } from "../ui/badge";
import { useCartItemCount } from "@/features/carts/hooks/useCartItemCount";
import { useLogout } from "@/features/auth/hooks/useLogout";

const navItems = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Shop",
    path: "/products",
  },
  {
    title: "Contact",
    path: "/contacts",
  },
];

const Header = () => {
  const navigate = useNavigate();

  const { data: user } = useCurrentUser();
  const { data: cartItemCount } = useCartItemCount(user?.id);
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  const avatarFallback = user?.username?.charAt(0).toUpperCase() ?? "U";

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b bg-background/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
            <ShoppingBasket className="h-6 w-6 text-primary-foreground" />
          </div>

          <span className="text-lg font-semibold text-primary">Cartzen</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((ni) => (
            <NavLink
              to={ni.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {ni.title}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <Button variant="ghost" size="icon" className="relative h-10 w-10">
            <Link to="/cart" aria-label="Shopping cart">
              <ShoppingCart className="h-5 w-5" />

              {user && cartItemCount && cartItemCount > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Link>
          </Button>

          {/* User */}

          {user ? (
            <div className="group relative">
              <button
                type="button"
                className="rounded-full outline-none ring-offset-background transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Open account menu"
              >
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarFallback className="bg-primary text-sm font-semibold text-primary-foreground">
                    {avatarFallback}
                  </AvatarFallback>
                </Avatar>
              </button>

              <div className="invisible absolute right-0 top-full z-50 mt-2 w-40 translate-y-1 rounded-lg border bg-background p-1 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="h-9 w-full justify-start gap-2 rounded-md px-3 text-sm font-normal text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="size-4" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="default"
              onClick={() => navigate("/auth/login")}
              className="h-9 gap-2 rounded-full px-4 font-medium shadow-sm"
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
