import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold">Your cart is empty</h1>

      <p className="mt-2 text-muted-foreground">
        Add some products before proceeding to checkout.
      </p>

      <Button className="mt-6">
        <Link to="/products">Continue Shopping</Link>
      </Button>
    </div>
  );
};

export default CartEmpty;
