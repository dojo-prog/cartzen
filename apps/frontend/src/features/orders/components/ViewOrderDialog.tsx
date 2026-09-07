import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { OrderWithItems } from "@cartzen/shared";
import { Package } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import { formatDateTime } from "@/utils/formatDateTime";
import { getOrderStatusVariant } from "@/utils/getOrderStatusVariant";
import { formatStatus } from "@/utils/formatStatus";

type Props = {
  order: OrderWithItems | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ViewOrderDialog = ({ order, open, onOpenChange }: Props) => {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            View the details and items for this order.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order information */}
          <div className="grid grid-cols-2 gap-4 rounded-lg border p-4 sm:grid-cols-4">
            <div>
              <p className="text-xs text-muted-foreground">Order ID</p>
              <p className="mt-1 truncate text-xs font-medium">#{order.id}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <Badge
                className="mt-1"
                variant={getOrderStatusVariant(order.status) ?? "secondary"}
              >
                {formatStatus(order.status)}
              </Badge>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Items</p>
              <p className="mt-1 text-sm font-medium">
                {order.items.reduce((total, item) => total + item.quantity, 0)}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Created</p>
              <p className="mt-1 text-xs font-medium">
                {formatDateTime(order.created_at)}
              </p>
            </div>
          </div>

          {/* Order items */}
          <div>
            <div className="mb-3">
              <h3 className="text-sm font-semibold">Order Items</h3>
              <p className="text-sm text-muted-foreground">
                Products included in this order.
              </p>
            </div>

            <div className="divide-y rounded-lg border">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3">
                  <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted">
                    {item.product_thumbnail_url ? (
                      <img
                        src={item.product_thumbnail_url}
                        alt={item.product_name}
                        className="size-full object-cover"
                      />
                    ) : (
                      <Package className="size-5 text-muted-foreground" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {item.product_name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {formatPrice(item.unit_price_cents)} × {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm font-medium">
                    {formatPrice(item.subtotal_cents)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Order summary */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Order Summary</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(order.subtotal_cents)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatPrice(order.tax_cents)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{formatPrice(order.shipping_fee_cents)}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>{formatPrice(order.total_cents)}</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Order Timeline</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Created</span>
                <span>{formatDateTime(order.created_at)}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Paid</span>
                <span>
                  {order.paid_at ? formatDateTime(order.paid_at) : "Pending"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Processed</span>
                <span>
                  {order.processed_at
                    ? formatDateTime(order.processed_at)
                    : "Pending"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Shipped</span>
                <span>
                  {order.shipped_at
                    ? formatDateTime(order.shipped_at)
                    : "Pending"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Delivered</span>
                <span>
                  {order.delivered_at
                    ? formatDateTime(order.delivered_at)
                    : "Pending"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Cancelled</span>
                <span>
                  {order.cancelled_at
                    ? formatDateTime(order.cancelled_at)
                    : "Pending"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewOrderDialog;
