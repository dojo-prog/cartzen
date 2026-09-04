import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDistance } from "@/utils/formatDistance";
import { formatPrice } from "@/utils/formatPrice";
import type { Shipping, Store } from "@cartzen/shared";

type Props = {
  shippingDetails?: Shipping;
  shippingCalculation?: {
    shipping_fee_cents: number;
    shipping_distance_meters: number;
    store_address: Store;
  };
};

const ShippingDetails = ({ shippingDetails, shippingCalculation }: Props) => {
  if (!shippingDetails) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping method</span>

          <span className="font-medium">{shippingDetails.name}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Base fee</span>

          <span>{formatPrice(shippingDetails.base_fee_cents)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Fee per km</span>

          <span>{formatPrice(shippingDetails.fee_per_km_cents)}</span>
        </div>

        {shippingCalculation && (
          <>
            <Separator />

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Distance</span>

              <span>
                {formatDistance(shippingCalculation.shipping_distance_meters)}
              </span>
            </div>

            <div className="flex justify-between text-sm font-medium">
              <span>Calculated shipping</span>

              <span>{formatPrice(shippingCalculation.shipping_fee_cents)}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ShippingDetails;
