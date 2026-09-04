import { CircleDollarSign, Loader2 } from "lucide-react";

type Props = {
  orderId?: string;
};

const ProcessingPayment = ({ orderId }: Props) => {
  return (
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
        We're processing your payment and confirming your order. This may take a
        moment.
      </p>

      <div className="mt-8 flex w-full max-w-sm items-center gap-3 rounded-lg border bg-muted/40 p-4 text-left">
        <CircleDollarSign className="size-5 shrink-0 text-muted-foreground" />

        <div>
          <p className="text-sm font-medium">Please don't close this page</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Your order will be updated automatically once the payment is
            complete.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessingPayment;
