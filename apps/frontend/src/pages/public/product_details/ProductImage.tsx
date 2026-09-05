import type { ProductWithRelations } from "@cartzen/shared";
import { Star } from "lucide-react";

type Props = {
  product: ProductWithRelations;
};

const ProductImage = ({ product }: Props) => {
  return (
    <div className="relative">
      <div className="aspect-square overflow-hidden rounded-2xl border bg-muted/30">
        <img
          src={product.thumbnail_url}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {product.is_featured && (
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur">
          <Star className="size-3.5 fill-current" />
          Featured
        </div>
      )}
    </div>
  );
};

export default ProductImage;
