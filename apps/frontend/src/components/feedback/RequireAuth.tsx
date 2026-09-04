import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { LogIn, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RequireAuth = () => {
  const { data: user } = useCurrentUser();

  const navigate = useNavigate();

  if (user) return null;

  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 rounded-full bg-muted p-4">
          <ShoppingCart className="size-8 text-muted-foreground" />
        </div>

        <h2 className="text-xl font-semibold">Sign in to view your cart</h2>

        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Your cart is available once you sign in. Log in to add products,
          manage your quantities, and continue to checkout.
        </p>

        <Button
          variant="default"
          onClick={() => navigate("/auth/login")}
          className="h-9 gap-2 rounded-full px-4 font-medium shadow-sm mt-8"
        >
          <LogIn className="h-4 w-4" />
          <span>Login</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default RequireAuth;
