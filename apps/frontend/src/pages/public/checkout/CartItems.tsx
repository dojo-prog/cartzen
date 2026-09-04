import { formatPrice } from "@/utils/formatPrice";
import type { CartItemWithRelations } from "@cartzen/shared";

type Props = {
  cartItems?: CartItemWithRelations[];
};

const CartItems = ({ cartItems }: Props) => {
  return (
    <div className="space-y-4">
      {cartItems?.map((item) => (
        <div key={item.product.id} className="flex gap-3">
          <div className="size-16 shrink-0 overflow-hidden rounded-md border">
            <img
              src={item.product.thumbnail_url}
              alt={item.product.name}
              className="size-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-sm font-medium">
              {item.product.name}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Qty: {item.quantity}
            </p>
          </div>

          <p className="text-sm font-medium">
            {formatPrice(item.product.price_cents * item.quantity)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
