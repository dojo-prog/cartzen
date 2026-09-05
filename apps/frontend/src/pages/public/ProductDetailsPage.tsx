import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "@/features/products/hooks/useProduct";
import ProductDetailsSkeleton from "./product_details/ProductDetailsSkeleton";
import ProductDetailsError from "./product_details/ProductDetailsError";
import ProductInformation from "./product_details/ProductInformation";
import AdditionalInformation from "./product_details/AdditionalInformation";
import ProductImage from "./product_details/ProductImage";

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();

  const { data: product, isPending, isError } = useProduct(productId);

  console.log(product);

  if (isPending) return <ProductDetailsSkeleton />;

  if (isError) return <ProductDetailsError />;

  const isOutOfStock = product.stock_quantity <= 0;

  if (!product) return null;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-2 sm:py-4">
      {/* Back */}
      <Button variant="ghost" className="-ml-2 mb-6">
        <Link to="/products" className="flex items-center">
          <ArrowLeft className="mr-2 size-4" />
          Back to Products
        </Link>
      </Button>

      {/* Product */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductImage product={product} />

        <ProductInformation product={product} isOutOfStock={isOutOfStock} />
      </div>

      {/* Additional information */}
      <AdditionalInformation product={product} isOutOfStock={isOutOfStock} />
    </div>
  );
};

export default ProductDetailPage;
