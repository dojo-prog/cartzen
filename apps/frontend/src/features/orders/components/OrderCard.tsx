import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/formatDate";
import { formatDistance } from "@/utils/formatDistance";
import { formatOrderId } from "@/utils/formatOrderId";
import { formatPrice } from "@/utils/formatPrice";
import { getStatusConfig } from "@/utils/getStatusConfig";
import { getStatusDate } from "@/utils/getStatusDate";
import { Separator } from "@base-ui/react";
import type { OrderWithItems } from "@cartzen/shared";
import { ChevronRight, Package } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  order: OrderWithItems;
};

const OrderCard = ({ order }: Props) => {
  const status = getStatusConfig(order.status);
  const StatusIcon = status.icon;
  const statusDate = getStatusDate(order);

  return (
    <Card
      key={order.id}
      className="overflow-hidden transition-shadow hover:shadow-md"
    >
      {/* Order header */}
      <CardHeader className="border-b bg-muted/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base">
              Order {formatOrderId(order.id)}
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              Placed on {formatDate(order.created_at)}
            </p>
          </div>

          <div
            className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${status.className}`}
          >
            <StatusIcon className="size-3.5" />
            {status.label}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 sm:p-6">
        {/* Order summary */}
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Total
            </p>
            <p className="mt-1 text-lg font-bold">
              {formatPrice(order.total_cents)}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Items
            </p>
            <p className="mt-1 font-semibold">
              {order.items.length} {order.items.length === 1 ? "item" : "items"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Delivery Distance
            </p>
            <p className="mt-1 font-semibold">
              {formatDistance(order.shipping_distance_meters)}
            </p>
          </div>
        </div>

        <Separator className="my-5" />

        {/* Order items */}
        {order.items.length > 0 && (
          <>
            <div className="space-y-3">
              {order.items.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
                      <Package className="size-5 text-muted-foreground" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {item.product_name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="shrink-0 text-sm font-medium">
                    {formatPrice(item.unit_price_cents * item.quantity)}
                  </p>
                </div>
              ))}

              {order.items.length > 3 && (
                <p className="pt-1 text-xs text-muted-foreground">
                  + {order.items.length - 3} more{" "}
                  {order.items.length - 3 === 1 ? "item" : "items"}
                </p>
              )}
            </div>

            <Separator className="my-5" />
          </>
        )}

        {/* Footer */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            {statusDate ?? "Order placed successfully"}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            {order.status === "pending" && (
              <Button>
                <Link to={`/payments/${order.id}`}>Pay Now</Link>
              </Button>
            )}

            <Button variant="outline">
              <Link to={`/orders/${order.id}`} className="flex items-center">
                View Details
                <ChevronRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
