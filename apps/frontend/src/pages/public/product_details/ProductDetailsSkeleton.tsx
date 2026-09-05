import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailsSkeleton = () => {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <div className="space-y-8">
        {/* Back button */}
        <Skeleton className="h-9 w-36" />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product image */}
          <Skeleton className="aspect-square rounded-2xl" />

          {/* Product information */}
          <div className="space-y-6">
            {/* Category / subcategory */}
            <Skeleton className="h-4 w-40" />

            {/* Product name */}
            <Skeleton className="h-10 w-3/4" />

            {/* Price */}
            <Skeleton className="h-9 w-36" />

            {/* Stock badge */}
            <Skeleton className="h-8 w-28 rounded-full" />

            <Separator />

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-20 w-full" />
            </div>

            <Separator />

            {/* Quantity */}
            <Skeleton className="h-10 w-32" />

            {/* Add to cart */}
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
