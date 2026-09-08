import { MoreHorizontal, Package } from "lucide-react";

import type { OrderWithItems } from "@cartzen/shared";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatPrice } from "@/utils/formatPrice";
import { formatDate } from "@/utils/formatDate";
import OrdersTableEmpty from "./OrdersTableEmpty";
import { formatStatus } from "@/utils/formatStatus";
import { useState } from "react";
import ViewOrderDialog from "@/features/orders/components/ViewOrderDialog";
import AdvanceStatusDialog from "@/features/orders/components/AdvanceStatusDialog";
import { getStatusConfig } from "@/utils/getStatusConfig";
import { cn } from "@/lib/utils";
import AdminCancelOrderDialog from "@/features/orders/components/AdminCancelOrderDialog";

type Props = {
  orders: OrderWithItems[];
};

const OrdersTable = ({ orders }: Props) => {
  const [viewingOrder, setViewingOrder] = useState<OrderWithItems | null>(null);
  const [advancingOrderStatus, setAdvancingOrderStatus] =
    useState<OrderWithItems | null>(null);
  const [cancellingOrder, setCancellingOrder] = useState<OrderWithItems | null>(
    null,
  );

  return (
    <>
      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <table className="w-full table-fixed text-sm">
            <thead className="bg-background">
              <tr className="border-b bg-muted/30">
                <th className="w-[28%] px-6 py-3 text-left font-medium text-muted-foreground">
                  Order
                </th>

                <th className="w-[15%] px-6 py-3 text-left font-medium text-muted-foreground">
                  Items
                </th>

                <th className="w-[15%] px-6 py-3 text-left font-medium text-muted-foreground">
                  Total
                </th>

                <th className="w-[15%] px-6 py-3 text-left font-medium text-muted-foreground">
                  Status
                </th>

                <th className="w-[12%] px-6 py-3 text-left font-medium text-muted-foreground">
                  Payment
                </th>

                <th className="w-[10%] px-6 py-3 text-left font-medium text-muted-foreground">
                  Created
                </th>

                <th className="w-[5%] px-6 py-3" />
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => {
                const itemCount = order.items.reduce(
                  (total, item) => total + item.quantity,
                  0,
                );

                const statusStyles = getStatusConfig(order.status).className;

                return (
                  <tr
                    key={order.id}
                    className="border-b transition-colors last:border-0 hover:bg-muted/30"
                  >
                    {/* Order */}
                    <td className="px-6 py-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
                          {order.items[0]?.product_thumbnail_url ? (
                            <img
                              src={order.items[0].product_thumbnail_url}
                              alt={order.items[0].product_name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Package className="size-5 text-muted-foreground" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-medium">
                            Order #{order.id.slice(0, 8)}
                          </p>

                          <p className="truncate text-xs text-muted-foreground">
                            #{order.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Items */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          {itemCount} {itemCount === 1 ? "item" : "items"}
                        </span>

                        {order.items.length > 0 && (
                          <Badge variant="outline" className="hidden lg:block">
                            {order.items.length}{" "}
                            {order.items.length === 1 ? "product" : "products"}
                          </Badge>
                        )}
                      </div>
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4 font-medium">
                      {formatPrice(order.total_cents)}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <Badge className={cn(statusStyles)}>
                        {formatStatus(order.status)}
                      </Badge>
                    </td>

                    {/* Payment */}
                    <td className="px-6 py-4">
                      <Badge variant={order.paid_at ? "default" : "outline"}>
                        {order.paid_at ? "Paid" : "Unpaid"}
                      </Badge>
                    </td>

                    {/* Created */}
                    <td className="px-6 py-4 text-muted-foreground">
                      {formatDate(order.created_at)}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                          >
                            <MoreHorizontal className="size-4" />

                            <span className="sr-only">Open order actions</span>
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setViewingOrder(order)}
                          >
                            View order
                          </DropdownMenuItem>

                          {order.status !== "delivered" &&
                            order.status !== "cancelled" && (
                              <DropdownMenuItem
                                onClick={() => setAdvancingOrderStatus(order)}
                              >
                                Update status
                              </DropdownMenuItem>
                            )}

                          {order.status !== "delivered" &&
                            order.status !== "cancelled" && (
                              <>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                  onClick={() => setCancellingOrder(order)}
                                >
                                  Cancel order
                                </DropdownMenuItem>
                              </>
                            )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}

              {orders.length === 0 && <OrdersTableEmpty />}
            </tbody>
          </table>
        </div>
      </CardContent>

      {viewingOrder && (
        <ViewOrderDialog
          order={viewingOrder}
          open={!!viewingOrder}
          onOpenChange={(open) => {
            if (!open) {
              setViewingOrder(null);
            }
          }}
        />
      )}

      {advancingOrderStatus && (
        <AdvanceStatusDialog
          order={advancingOrderStatus}
          open={!!advancingOrderStatus}
          onOpenChange={(open) => {
            if (!open) {
              setAdvancingOrderStatus(null);
            }
          }}
        />
      )}

      {cancellingOrder && (
        <AdminCancelOrderDialog
          order={cancellingOrder}
          open={!!cancellingOrder}
          onOpenChange={(open) => {
            if (!open) {
              setCancellingOrder(null);
            }
          }}
        />
      )}
    </>
  );
};

export default OrdersTable;
