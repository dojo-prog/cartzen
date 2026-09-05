import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/utils/formatPrice";
import type { OrderWithItems } from "@cartzen/shared";
import { Package } from "lucide-react";

type Props = {
  order: OrderWithItems;
};

const OrderItemsCard = ({ order }: Props) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Order Items</CardTitle>

          <span className="text-sm text-muted-foreground">
            {order.items.length} {order.items.length === 1 ? "item" : "items"}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-5">
          {order.items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Package className="size-7 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-medium">{item.product_name}</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {formatPrice(item.unit_price_cents)} × {item.quantity}
                </p>
              </div>

              <p className="shrink-0 font-semibold">
                {formatPrice(item.unit_price_cents * item.quantity)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemsCard;
