import { ShoppingBasket, ShoppingCart } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { Badge } from "../ui/badge";
import { useCartItemCount } from "@/features/carts/hooks/useCartItemCount";

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
  const { data: user } = useCurrentUser();
  const { data: cartItemCount } = useCartItemCount(user?.id);

  console.log(cartItemCount);

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
          <Avatar>
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
