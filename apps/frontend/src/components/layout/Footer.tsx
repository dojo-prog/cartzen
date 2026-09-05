import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto border-t bg-primary/10">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Main footer */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-semibold tracking-tight"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ShoppingBag className="size-4" />
              </span>

              <span className="text-lg">Cartzen</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              Everything you need, delivered right to your door. Shop quality
              products with a simple and reliable experience.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold">Shop</h3>

            <ul className="mt-4 space-y-3">
              <FooterLink to="/products">All Products</FooterLink>
              <FooterLink to="/products?featured=true">Featured</FooterLink>
              <FooterLink to="/products?inStock=true">In Stock</FooterLink>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold">Account</h3>

            <ul className="mt-4 space-y-3">
              <FooterLink to="/orders">My Orders</FooterLink>
              <FooterLink to="/cart">Shopping Cart</FooterLink>
              <FooterLink to="/profile">My Profile</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold">Support</h3>

            <ul className="mt-4 space-y-3">
              <FooterLink to="/contact-us">Contact Us</FooterLink>
              <FooterLink to="/shipping">Shipping Information</FooterLink>
              <FooterLink to="/returns">Returns & Refunds</FooterLink>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col gap-4 border-t py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Cartzen. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

type FooterLinkProps = {
  to: string;
  children: React.ReactNode;
};

const FooterLink = ({ to, children }: FooterLinkProps) => {
  return (
    <li>
      <Link
        to={to}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {children}
      </Link>
    </li>
  );
};

export default Footer;
