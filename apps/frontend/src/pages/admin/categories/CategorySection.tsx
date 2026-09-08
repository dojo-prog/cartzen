import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CategoryTable from "./CategoryTable";
import { useAdminCategories } from "@/features/categories/hooks/useAdminCategories";
import Pagination from "@/components/common/Pagination";
import { useState } from "react";
import type { CategoryQuery } from "@cartzen/shared";
import SearchInput from "@/components/common/SearchInput";
import { useDebounce } from "@/hooks/useDebounce";

const CategorySection = () => {
  const [filters, setFilters] = useState<CategoryQuery>({
    page: 1,
    limit: 10,
    search: "",
  });

  const debouncedSearch = useDebounce(filters.search);

  const { data: categoriesData } = useAdminCategories({
    ...filters,
    search: debouncedSearch,
  });

  if (!categoriesData) return null;

  const { categories, pagination } = categoriesData;

  return (
    <Card>
      <CardHeader className="border-b flex items-center justify-between">
        <div>
          <CardTitle className="text-base">Categories</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage your product categories.
          </p>
        </div>

        <div className="flex items-center">
          <SearchInput
            value={filters.search ?? ""}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, search: value, page: 1 }))
            }
            placeholder="Search category name..."
          />

          <Pagination
            page={pagination.page}
            totalPages={pagination.total_pages}
            onPageChange={(value) =>
              setFilters((prev) => ({ ...prev, page: value }))
            }
          />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <CategoryTable categories={categories} />
      </CardContent>
    </Card>
  );
};

export default CategorySection;
