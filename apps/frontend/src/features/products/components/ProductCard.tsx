import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProductWithRelations } from "@cartzen/shared";
import { formatPrice } from "@/utils/formatPrice";

interface ProductCardProps {
  product: ProductWithRelations;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isOutOfStock = product.stock_quantity <= 0;

  return (
    <Card
      className="group h-full overflow-hidden border transition-shadow hover:shadow-md pt-0"
      onClick={() => {}}
    >
      {/* Product Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        <img
          src={product.thumbnail_url}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Featured Badge */}
        {product.is_featured && (
          <Badge className="absolute left-2 top-2 text-xs">Featured</Badge>
        )}

        {/* Stock Badge */}
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

      {/* Action */}
      <CardFooter className="p-3 pt-0">
        <Button
          className="h-9 w-full text-sm"
          disabled={isOutOfStock}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {isOutOfStock ? "Out of stock" : "Add to cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
