import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

const EmptyCart = () => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <ShoppingCart className="mb-4 size-12 text-muted-foreground" />

        <h2 className="text-xl font-semibold">Your cart is empty</h2>

        <p className="mt-2 text-muted-foreground">
          Add some products to your cart to get started.
        </p>

        <Button className="mt-6">Continue Shopping</Button>
      </CardContent>
    </Card>
  );
};

export default EmptyCart;
