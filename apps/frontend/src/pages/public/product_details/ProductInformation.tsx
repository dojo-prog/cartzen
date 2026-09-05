import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useAddToCart } from "@/features/carts/hooks/useAddToCart";
import { formatPrice } from "@/utils/formatPrice";
import { Separator } from "@base-ui/react";
import type { ProductWithRelations } from "@cartzen/shared";
import {
  Check,
  Loader2,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type Props = {
  product: ProductWithRelations;
  isOutOfStock: boolean;
};

const ProductInformation = ({ product, isOutOfStock }: Props) => {
  const { data: user } = useCurrentUser();
  const { mutate: addToCart, isPending } = useAddToCart();

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, product.stock_quantity));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.info("Sign-in to be able to add to cart");
    }

    addToCart(
      { product_id: product.id, quantity },
      {
        onSuccess: () => setQuantity(1),
      },
    );
  };
  return (
    <div className="flex flex-col">
      {/* Category */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          to={`/products?category=${product.category.id}`}
          className="hover:text-foreground hover:underline"
        >
          {product.category.name}
        </Link>

        <span>/</span>

        <span>{product.subcategory.name}</span>
      </div>

      {/* Name */}
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        {product.name}
      </h1>

      {/* Price */}
      <p className="mt-5 text-3xl font-bold">
        {formatPrice(product.price_cents)}
      </p>

      {/* Stock */}
      <div className="mt-4">
        {isOutOfStock ? (
          <div className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-3 py-1.5 text-sm font-medium text-destructive">
            <Package className="size-4" />
            Out of stock
          </div>
        ) : product.stock_quantity <= 5 ? (
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700">
            <Package className="size-4" />
            Only {product.stock_quantity} left
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
            <Check className="size-4" />
            In stock
          </div>
        )}
      </div>

      <Separator className="my-6" />

      {/* Description */}
      <div>
        <h2 className="text-sm font-semibold">Description</h2>

        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          {product.description}
        </p>
      </div>

      <Separator className="my-6" />

      {/* Quantity + cart */}
      {!isOutOfStock && (
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium">Quantity</p>

            <div className="flex w-fit items-center rounded-lg border">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-r-none"
                onClick={handleDecrement}
                disabled={quantity <= 1}
              >
                <Minus className="size-4" />
              </Button>

              <span className="flex w-12 items-center justify-center text-sm font-semibold">
                {quantity}
              </span>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-l-none"
                onClick={handleIncrement}
                disabled={quantity >= product.stock_quantity}
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>

          <Button size="lg" className="w-full" onClick={handleAddToCart}>
            {!isPending ? (
              <>
                <ShoppingCart className="mr-2 size-5" />
                Add to Cart
              </>
            ) : (
              <Loader2 className="size-5 animate-spin" />
            )}
          </Button>
        </div>
      )}

      {/* Product highlights */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Card className="shadow-none">
          <CardContent className="flex items-start gap-3 p-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
              <Truck className="size-4 text-muted-foreground" />
            </div>

            <div>
              <p className="text-sm font-medium">Fast Delivery</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Reliable shipping to your address
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="flex items-start gap-3 p-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
              <Package className="size-4 text-muted-foreground" />
            </div>

            <div>
              <p className="text-sm font-medium">Product Details</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Weight: {(product.weight_grams / 1000).toFixed(2)} kg
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductInformation;
