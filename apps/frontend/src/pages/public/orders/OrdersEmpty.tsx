import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const OrdersEmpty = () => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="size-8 text-muted-foreground" />
        </div>

        <h2 className="text-xl font-semibold">No orders yet</h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          You haven't placed any orders yet. Start shopping and your purchases
          will appear here.
        </p>

        <Button className="mt-6">
          <Link to="/products" className="flex items-center">
            <ShoppingBag className="mr-2 size-4" />
            Start Shopping
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrdersEmpty;
