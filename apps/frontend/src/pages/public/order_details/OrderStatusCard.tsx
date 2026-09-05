import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GetStatusConfigResult } from "@/utils/getStatusConfig";
import type { OrderWithItems } from "@cartzen/shared";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  order: OrderWithItems;
  status: GetStatusConfigResult;
  StatusIcon: LucideIcon;
};

const OrderStatusCard = ({ order, status, StatusIcon }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Order Status</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-start gap-4">
          <div
            className={`flex size-11 shrink-0 items-center justify-center rounded-full ${status.className}`}
          >
            <StatusIcon className="size-5" />
          </div>

          <div>
            <p className="font-semibold">{status.label}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {status.description}
            </p>
          </div>
        </div>

        {order.status === "pending" && (
          <Button className="mt-5">
            <Link to={`/payments/${order.id}`}>Complete Payment</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderStatusCard;
