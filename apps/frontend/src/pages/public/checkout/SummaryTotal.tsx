import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils/formatPrice";
import type { Store } from "@cartzen/shared";

type Props = {
  selectedAddressId?: string;
  shippingCalculation?: {
    shipping_fee_cents: number;
    shipping_distance_meters: number;
    store_address: Store;
  };
  subtotal?: number;
  shippingFee?: number;
  total?: number;
};

const SummaryTotal = ({
  selectedAddressId,
  shippingCalculation,
  subtotal,
  shippingFee,
  total,
}: Props) => {
  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Subtotal</span>

        <span>{formatPrice(subtotal ?? 0)}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-muted-foreground">Shipping</span>

        <span>
          {selectedAddressId && shippingCalculation
            ? formatPrice(shippingFee ?? 0)
            : "—"}
        </span>
      </div>

      <Separator />

      <div className="flex justify-between text-base font-semibold">
        <span>Total</span>

        <span>
          {selectedAddressId && shippingCalculation
            ? formatPrice(total ?? 0)
            : formatPrice(subtotal ?? 0)}
        </span>
      </div>
    </div>
  );
};

export default SummaryTotal;
