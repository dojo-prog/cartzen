import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { formatPrice } from "@/utils/formatPrice";
import type { CartItemWithRelations } from "@cartzen/shared";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useUpdateItemQuantity } from "../hooks/useUpdateItemQuantity";
import { useRemoveFromCart } from "../hooks/useRemoveFromCart";

type Props = {
  item: CartItemWithRelations;
};

const CartItem = ({ item }: Props) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const debouncedQty = useDebounce(quantity);

  const { mutate: updateQty } = useUpdateItemQuantity();
  const { mutate: removeFromCart, isPending: isRemoving } = useRemoveFromCart();

  const quantityChanged = useRef(false);

  useEffect(() => {
    if (!quantityChanged.current) return;

    updateQty({
      productId: item.product.id,
      body: { quantity: debouncedQty },
    });

    quantityChanged.current = false;
  }, [debouncedQty, item.product.id, updateQty]);

  const handleIncrement = () => {
    quantityChanged.current = true;

    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity <= 1) return;

    quantityChanged.current = true;

    setQuantity((prev) => prev - 1);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(item.product.id);
  };

  return (
    <div className="flex gap-4">
      <div className="size-24 shrink-0 overflow-hidden rounded-md border">
        <img
          src={item.product.thumbnail_url}
          alt={item.product.name}
          className="size-full object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <h3 className="font-medium">{item.product.name}</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {formatPrice(item.product.price_cents, "PHP")}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center rounded-md border">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={handleDecrement}
              disabled={quantity <= 1}
            >
              <Minus className="size-4" />
            </Button>

            <span className="w-8 text-center text-sm">{quantity}</span>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={handleIncrement}
            >
              <Plus className="size-4" />
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemoveFromCart}
            className="text-muted-foreground hover:text-destructive"
          >
            {!isRemoving ? (
              <Trash2 className="size-4" />
            ) : (
              <Loader2 className="size-4 animate-spin" />
            )}
          </Button>
        </div>
      </div>

      <div className="hidden text-right sm:block">
        <p className="font-medium">
          {formatPrice(item.product.price_cents * quantity, "PHP")}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
