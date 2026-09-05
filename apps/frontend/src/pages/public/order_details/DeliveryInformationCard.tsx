import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistance } from "@/utils/formatDistance";
import { formatPrice } from "@/utils/formatPrice";
import type { OrderWithItems } from "@cartzen/shared";
import { MapPin } from "lucide-react";

type Props = {
  order: OrderWithItems;
};

const DeliveryInformationCard = ({ order }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Delivery Information</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-muted">
            <MapPin className="size-5 text-muted-foreground" />
          </div>

          <div className="min-w-0">
            <p className="font-medium">Shipping Distance</p>

            <p className="mt-1 text-sm text-muted-foreground">
              {formatDistance(order.shipping_distance_meters)}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-lg border bg-muted/30 p-4">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-muted-foreground">Shipping fee</span>

            <span className="font-medium">
              {formatPrice(order.shipping_fee_cents)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryInformationCard;
