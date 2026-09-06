import { Card } from "@/components/ui/card";
import Header from "./products/Header";
import StatusCards from "./products/StatusCards";
import ProductTable from "./products/ProductTable";
import ProductTableHeader from "./products/ProductTableHeader";
import { useAdminProducts } from "@/features/products/hooks/useAdminProducts";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import type { ProductQuery } from "@cartzen/shared";

const AdminProductsPage = () => {
  const [filters, setFilters] = useState<ProductQuery>({
    page: 1,
    limit: 10,
    search: "",
  });
  const { page, limit, search } = filters;

  console.log(page);

  const debouncedSearch = useDebounce(search);

  const {
    data: productData,
    isPending,
    isError,
  } = useAdminProducts({
    page,
    limit,
    search: debouncedSearch,
  });

  if (isPending || isError) return null;

  const { products, pagination } = productData;

  return (
    <div className="space-y-6">
      <Header />

      <StatusCards />

      {/* Products */}
      <Card>
        <ProductTableHeader
          search={search ?? ""}
          onSearchChange={(value) =>
            setFilters((prev) => ({ ...prev, search: value, page: 1 }))
          }
          onPageChange={(value) =>
            setFilters((prev) => ({ ...prev, page: value }))
          }
          pagination={pagination}
        />
        <ProductTable products={products} />
      </Card>
    </div>
  );
};

export default AdminProductsPage;
