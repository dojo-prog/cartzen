import DropdownMenuFilter from "@/components/common/DropdownMenuFilter";
import SearchInput from "@/components/common/SearchInput";
import { useAllCategories } from "@/features/categories/hooks/useAllCategories";
import type { ProductQuery } from "@cartzen/shared";
import type { Dispatch, SetStateAction } from "react";

export type ProductFilters = Omit<ProductQuery, "page" | "limit">;

type Props = {
  filters: ProductFilters;
  setFilters: Dispatch<SetStateAction<ProductFilters>>;
};

const ProductFilters = ({ filters, setFilters }: Props) => {
  const { data: categoryData } = useAllCategories();

  const categoryItems = categoryData?.map((c) => ({
    label: c.name,
    value: c.slug,
  }));

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="w-1/2">
        <SearchInput
          value={filters.search ?? ""}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              search: value,
            }))
          }
          placeholder="Search product name..."
        />
      </div>

      {/* Filters */}
      <div className="flex items-end gap-4">
        {categoryItems && (
          <DropdownMenuFilter
            label="Category"
            value={filters.category ?? "all"}
            defaultValue="all"
            defaultItemLabel="All"
            radioItems={categoryItems}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                category: value === "all" ? undefined : value,
              }))
            }
          />
        )}
      </div>
    </div>
  );
};

export default ProductFilters;
