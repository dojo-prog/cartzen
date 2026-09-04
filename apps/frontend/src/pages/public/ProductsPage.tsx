import SearchInput from "@/components/common/SearchInput";
import ProductCard from "@/features/products/components/ProductCard";
import ProductCardSkeletons from "@/features/products/components/ProductCardsSkeletion";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useDebounce } from "@/hooks/useDebounce";
import { useScroll } from "@/hooks/useScroll";
import { useState } from "react";

const ProductsPage = () => {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useProducts({ page: 1, limit: 10, search: debouncedSearch });

  const { observerRef } = useScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const products = data?.pages.flatMap((page) => page.products) ?? [];

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold mb-6">Product List</h2>

      {/* Search bar */}
      <div className="w-1/2">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search product name..."
        />
      </div>

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
