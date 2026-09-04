import { Button } from "@/components/ui/button";
import { ShoppingBag, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  orderId?: string;
};

const PaymentFailed = ({ orderId }: Props) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-destructive/10">
        <XCircle className="size-10 text-destructive" />
      </div>

      {orderId && (
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          Order #{orderId}
        </p>
      )}

      <h1 className="text-2xl font-bold tracking-tight">Payment failed</h1>

      <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
        We couldn't process your payment. Your order has been cancelled and no
        payment was completed.
      </p>

      <div className="mt-8 w-full rounded-lg border border-destructive/20 bg-destructive/5 p-4">
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <XCircle className="size-4 text-destructive" />
          Payment was unsuccessful
        </div>

        <p className="mt-1 text-xs text-muted-foreground">
          You can continue shopping and place a new order whenever you're ready.
        </p>
      </div>

      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
        <Button variant="outline" className="flex-1">
          <Link to="/products" className="flex items-center">
            <ShoppingBag className="mr-2 size-4" />
            Continue Shopping
          </Link>
        </Button>

        <Button className="flex-1">
          <Link to="/orders">View Orders</Link>
        </Button>
      </div>
    </div>
  );
};

export default PaymentFailed;
