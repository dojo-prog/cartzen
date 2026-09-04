import { Button } from "@/components/ui/button";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  orderId?: string;
};

const PaymentSuccess = ({ orderId }: Props) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-emerald-100">
        <CheckCircle2 className="size-10 text-emerald-600" />
      </div>

      <p className="mb-2 text-sm font-medium text-muted-foreground">
        Order #{orderId}
      </p>

      <h1 className="text-2xl font-bold tracking-tight">Payment successful!</h1>

      <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
        Your payment has been successfully processed and your order has been
        confirmed.
      </p>

      <div className="mt-8 w-full rounded-lg border bg-muted/40 p-4">
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <CheckCircle2 className="size-4 text-emerald-600" />
          Order confirmed
        </div>

        <p className="mt-1 text-xs text-muted-foreground">
          Thank you for your purchase!
        </p>
      </div>

      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
        <Button className="flex-1">
          <Link to={`/orders/${orderId}`}>View Order</Link>
        </Button>

        <Button variant="outline" className="flex-1">
          <Link to="/products" className="flex items-center">
            <ShoppingBag className="mr-2 size-4" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
