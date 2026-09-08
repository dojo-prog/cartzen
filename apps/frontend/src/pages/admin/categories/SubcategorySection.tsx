import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SubcategoryTable from "./SubcategoryTable";
import { useAdminSubcategories } from "@/features/subcategories/hooks/useAdminSubcategories";
import { useState } from "react";
import type { SubcategoryQuery } from "@cartzen/shared";
import SearchInput from "@/components/common/SearchInput";
import Pagination from "@/components/common/Pagination";
import { useDebounce } from "@/hooks/useDebounce";

const SubcategorySection = () => {
  const [filters, setFilters] = useState<SubcategoryQuery>({
    page: 1,
    limit: 10,
    search: "",
  });

  const debouncedSearch = useDebounce(filters.search);

  const { data: subcategoriesData } = useAdminSubcategories({
    ...filters,
    search: debouncedSearch,
  });

  if (!subcategoriesData) return null;

  const { subcategories, pagination } = subcategoriesData;

  return (
    <Card>
      <CardHeader className="border-b flex items-center justify-between">
        <div>
          <CardTitle className="text-base">Subcategories</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage your product subcategories.
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
        <SubcategoryTable subcategories={subcategories} />
      </CardContent>
    </Card>
  );
};

export default SubcategorySection;
