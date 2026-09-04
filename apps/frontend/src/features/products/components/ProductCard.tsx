import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProductWithRelations } from "@cartzen/shared";
import { formatPrice } from "@/utils/formatPrice";
import { useAddToCart } from "@/features/carts/hooks/useAddToCart";
import ButtonLoading from "@/components/common/ButtonLoading";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { toast } from "sonner";
import { useState } from "react";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";

interface ProductCardProps {
  product: ProductWithRelations;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { data: user } = useCurrentUser();
  const { mutate, isPending } = useAddToCart();

  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = product.stock_quantity <= 0;
  const maxQuantity = product.stock_quantity;

  const handleAddToCart = () => {
    if (!user) {
      toast.info("Please login to be able to add to cart");
      return;
    }

    mutate(
      {
        product_id: product.id,
        quantity,
      },
      {
        onSuccess: () => {
          setIsAdding(false);
          setQuantity(1);
        },
      },
    );
  };

  const handleCancel = () => {
    setIsAdding(false);
    setQuantity(1);
  };

  const increaseQuantity = () => {
    setQuantity((current) => Math.min(current + 1, maxQuantity));
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(current - 1, 1));
  };

  return (
    <Card className="group h-full overflow-hidden border pt-0 transition-shadow hover:shadow-md">
      {/* Product Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        <img
          src={product.thumbnail_url}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {product.is_featured && (
          <Badge className="absolute left-2 top-2 text-xs">Featured</Badge>
        )}

        {isOutOfStock && (
          <Badge variant="secondary" className="absolute right-2 top-2 text-xs">
            Out of stock
          </Badge>
        )}
      </div>

      {/* Product Information */}
      <CardContent className="space-y-1.5 p-3">
        <div className="flex items-center gap-1 truncate text-xs text-muted-foreground">
          <span className="truncate">{product.category.name}</span>
          <span>•</span>
          <span className="truncate">{product.subcategory.name}</span>
        </div>

        <h3 className="line-clamp-1 font-semibold leading-tight">
          {product.name}
        </h3>

        {product.description && (
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {product.description}
          </p>
        )}

        <p className="pt-0.5 text-base font-bold">
          {formatPrice(product.price_cents, product.currency)}
        </p>
      </CardContent>

      {/* Actions */}
      <CardFooter className="p-3 pt-0">
        {!isAdding ? (
          <Button
            className="h-9 w-full gap-2 text-sm"
            disabled={isOutOfStock}
            onClick={() => setIsAdding(true)}
          >
            <ShoppingCart className="size-4" />
            Add to cart
          </Button>
        ) : (
          <div className="flex w-full items-center gap-2">
            {/* Quantity Controller */}
            <div className="flex h-9 items-center rounded-md border">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-9"
                disabled={quantity <= 1 || isPending}
                onClick={decreaseQuantity}
                aria-label="Decrease quantity"
              >
                <Minus className="size-3.5" />
              </Button>

              <span className="w-8 text-center text-sm font-medium">
                {quantity}
              </span>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-9"
                disabled={quantity >= maxQuantity || isPending}
                onClick={increaseQuantity}
                aria-label="Increase quantity"
              >
                <Plus className="size-3.5" />
              </Button>
            </div>

            {/* Add */}
            <Button
              className="h-9 flex-1 gap-1.5 text-sm"
              disabled={isPending}
              onClick={handleAddToCart}
            >
              <ButtonLoading btnTitle="Add" isLoading={isPending} />
            </Button>

            {/* Cancel */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-9 shrink-0"
              disabled={isPending}
              onClick={handleCancel}
              aria-label="Cancel"
            >
              <X className="size-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
