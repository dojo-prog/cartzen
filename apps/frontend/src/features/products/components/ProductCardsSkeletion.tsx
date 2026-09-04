import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductCardSkeletons = ({ count }: { count: number }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </>
);

export default ProductCardSkeletons;
