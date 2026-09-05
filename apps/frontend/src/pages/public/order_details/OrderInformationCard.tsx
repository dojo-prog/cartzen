import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/utils/formatDateTime";
import { formatDistance } from "@/utils/formatDistance";
import type { OrderWithItems } from "@cartzen/shared";

type Props = {
  order: OrderWithItems;
};

const OrderInformationCard = ({ order }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Order Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Order ID
          </p>

          <p className="mt-1 break-all font-medium">{order.id}</p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Placed
          </p>

          <p className="mt-1">{formatDateTime(order.created_at)}</p>
        </div>

        {order.paid_at && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Paid
            </p>

            <p className="mt-1">{formatDateTime(order.paid_at)}</p>
          </div>
        )}

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Delivery Distance
          </p>

          <p className="mt-1">
            {formatDistance(order.shipping_distance_meters)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderInformationCard;
