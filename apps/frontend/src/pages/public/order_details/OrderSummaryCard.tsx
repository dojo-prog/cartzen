import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/utils/formatPrice";
import { Separator } from "@base-ui/react";
import type { OrderWithItems } from "@cartzen/shared";

type Props = {
  order: OrderWithItems;
};

const OrderSummaryCard = ({ order }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Order Summary</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Subtotal</span>

            <span>{formatPrice(order.subtotal_cents)}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Tax</span>

            <span>{formatPrice(order.tax_cents)}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Shipping</span>

            <span>{formatPrice(order.shipping_fee_cents)}</span>
          </div>

          <Separator />

          <div className="flex justify-between gap-4 pt-1">
            <span className="font-semibold">Total</span>

            <span className="text-lg font-bold">
              {formatPrice(order.total_cents)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummaryCard;
