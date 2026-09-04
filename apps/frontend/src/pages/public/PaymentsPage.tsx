import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  CircleDollarSign,
  Loader2,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { usePayOrder } from "@/features/payments/hooks/usePayOrder";

type PaymentStatus = "processing" | "success" | "failed";

const PaymentsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [status, setStatus] = useState<PaymentStatus>("processing");

  const hasProcessedPayment = useRef(false);

  const { mutateAsync: payOrder, isPending } = usePayOrder();

  useEffect(() => {
    if (!orderId || hasProcessedPayment.current) {
      if (!orderId) {
        setStatus("failed");
      }

      return;
    }

    hasProcessedPayment.current = true;

    const processPayment = async () => {
      try {
        await payOrder(orderId);
        setStatus("success");
      } catch {
        setStatus("failed");
      }
    };

    processPayment();
  }, [orderId, payOrder]);

  const isProcessing = status === "processing" || isPending;

  return (
    <div className="container mx-auto flex min-h-[75vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg overflow-hidden">
        <CardContent className="px-6 py-12 sm:px-10">
          {/* Processing */}
          {isProcessing && (
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-muted">
                <Loader2 className="size-10 animate-spin text-muted-foreground" />
              </div>

              <p className="mb-2 text-sm font-medium text-muted-foreground">
                Order #{orderId}
              </p>

              <h1 className="text-2xl font-bold tracking-tight">
                Processing your payment
              </h1>

              <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                We're processing your payment and confirming your order. This
                may take a moment.
              </p>

              <div className="mt-8 flex w-full max-w-sm items-center gap-3 rounded-lg border bg-muted/40 p-4 text-left">
                <CircleDollarSign className="size-5 shrink-0 text-muted-foreground" />

                <div>
                  <p className="text-sm font-medium">
                    Please don't close this page
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Your order will be updated automatically once the payment is
                    complete.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Success */}
          {status === "success" && !isPending && (
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2 className="size-10 text-emerald-600" />
              </div>

              <p className="mb-2 text-sm font-medium text-muted-foreground">
                Order #{orderId}
              </p>

              <h1 className="text-2xl font-bold tracking-tight">
                Payment successful!
              </h1>

              <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                Your payment has been successfully processed and your order has
                been confirmed.
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
          )}

          {/* Failed */}
          {status === "failed" && (
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-destructive/10">
                <XCircle className="size-10 text-destructive" />
              </div>

              {orderId && (
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  Order #{orderId}
                </p>
              )}

              <h1 className="text-2xl font-bold tracking-tight">
                Payment failed
              </h1>

              <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                We couldn't process your payment. Your order has been cancelled
                and no payment was completed.
              </p>

              <div className="mt-8 w-full rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                <div className="flex items-center justify-center gap-2 text-sm font-medium">
                  <XCircle className="size-4 text-destructive" />
                  Payment was unsuccessful
                </div>

                <p className="mt-1 text-xs text-muted-foreground">
                  You can continue shopping and place a new order whenever
                  you're ready.
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsPage;
