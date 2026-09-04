import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <Card className="h-full overflow-hidden border pt-0">
      {/* Product Image */}
      <Skeleton className="aspect-4/3 w-full rounded-none" />

      {/* Product Information */}
      <CardContent className="space-y-1.5 p-3">
        {/* Category / Subcategory */}
        <Skeleton className="h-3 w-2/3" />

        {/* Product Name */}
        <Skeleton className="h-4 w-full" />

        {/* Description */}
        <Skeleton className="h-3 w-4/5" />

        {/* Price */}
        <Skeleton className="mt-1 h-5 w-1/3" />
      </CardContent>

      {/* Action */}
      <CardFooter className="p-3 pt-0">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
};

export default ProductCardSkeleton;
