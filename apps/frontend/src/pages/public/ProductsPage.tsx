import ProductCard from "@/features/products/components/ProductCard";
import ProductCardSkeletons from "@/features/products/components/ProductCardsSkeletion";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useDebounce } from "@/hooks/useDebounce";
import { useScroll } from "@/hooks/useScroll";
import type { ProductQuery } from "@cartzen/shared";
import { useState } from "react";
import ProductFilters from "./products/ProductFilters";

type ProductFilters = Omit<ProductQuery, "page" | "limit">;

const ProductsPage = () => {
  const [filters, setFilters] = useState<ProductFilters>({
    search: "",
    category: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    inStock: undefined,
    featured: undefined,
  });
  const { search, category } = filters;

  const debouncedSearch = useDebounce(search);

  const {
    data: productData,
    isPending,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useProducts({ page: 1, limit: 10, search: debouncedSearch, category });

  const { observerRef } = useScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const products = productData?.pages.flatMap((page) => page.products) ?? [];

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold mb-6">Product List</h2>

      {/* Product Filters */}
      <ProductFilters filters={filters} setFilters={setFilters} />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* Initial loading */}
        {isPending && <ProductCardSkeletons count={8} />}

        {/* Products */}
        {!isPending &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        {/* Loading next page */}
        {isFetchingNextPage && <ProductCardSkeletons count={4} />}

        {/* Infinite scroll sentinel */}
        {hasNextPage && <div ref={observerRef} className="h-1 w-full" />}
      </div>
    </div>
  );
};

export default ProductsPage;
