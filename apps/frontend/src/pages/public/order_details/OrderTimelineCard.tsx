import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TimelineItem from "./TimelineItem";
import type { OrderWithItems } from "@cartzen/shared";

type Props = {
  order: OrderWithItems;
};

const OrderTimelineCard = ({ order }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Order Timeline</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-5">
          <TimelineItem
            label="Order placed"
            date={order.created_at}
            completed
          />

          <TimelineItem
            label="Payment received"
            date={order.paid_at}
            completed={!!order.paid_at}
          />

          <TimelineItem
            label="Order processing"
            date={order.processed_at}
            completed={!!order.processed_at}
          />

          <TimelineItem
            label="Shipped"
            date={order.shipped_at}
            completed={!!order.shipped_at}
          />

          <TimelineItem
            label="Delivered"
            date={order.delivered_at}
            completed={!!order.delivered_at}
          />

          {order.cancelled_at && (
            <TimelineItem
              label="Order cancelled"
              date={order.cancelled_at}
              completed
              cancelled
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTimelineCard;
