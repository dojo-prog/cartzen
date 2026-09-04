import DropdownMenuFilter from "@/components/common/DropdownMenuFilter";
import SearchInput from "@/components/common/SearchInput";
import { useAllCategories } from "@/features/categories/hooks/useAllCategories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ProductQuery } from "@cartzen/shared";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ListSortDescending } from "lucide-react";

export type ProductFilters = Omit<ProductQuery, "page" | "limit">;

type Props = {
  filters: ProductFilters;
  setFilters: Dispatch<SetStateAction<ProductFilters>>;
};

const ProductFilters = ({ filters, setFilters }: Props) => {
  const { data: categoryData } = useAllCategories();

  const categoryItems =
    categoryData?.map((category) => ({
      label: category.name,
      value: category.slug,
    })) ?? [];

  const hasActiveFilters =
    !!filters.search ||
    filters.category !== undefined ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.inStock !== undefined ||
    filters.featured !== undefined ||
    filters.sort !== undefined;

  const handlePriceChange =
    (field: "minPrice" | "maxPrice") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setFilters((prev) => ({
        ...prev,
        [field]: value === "" ? undefined : Number(value),
      }));
    };

  const toggleBooleanFilter = (filter: "inStock" | "featured") => {
    setFilters((prev) => ({
      ...prev,
      [filter]: prev[filter] === true ? undefined : true,
    }));
  };

  const handleClear = () => {
    setFilters({});
  };

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
      <div className="flex flex-wrap items-end gap-4">
        {/* Category */}
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

        {/* Price */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Price</label>

          <div className="flex items-center gap-2">
            <Input
              type="number"
              min={0}
              placeholder="Min"
              value={filters.minPrice ?? ""}
              onChange={handlePriceChange("minPrice")}
              className="w-28"
            />

            <span className="text-muted-foreground">-</span>

            <Input
              type="number"
              min={0}
              placeholder="Max"
              value={filters.maxPrice ?? ""}
              onChange={handlePriceChange("maxPrice")}
              className="w-28"
            />
          </div>
        </div>

        {/* In Stock */}
        <Button
          type="button"
          variant={filters.inStock ? "default" : "outline"}
          onClick={() => toggleBooleanFilter("inStock")}
        >
          In Stock
        </Button>

        {/* Featured */}
        <Button
          type="button"
          variant={filters.featured ? "default" : "outline"}
          onClick={() => toggleBooleanFilter("featured")}
        >
          Featured
        </Button>
      </div>
      {/* Clear */}
      <Button
        type="button"
        variant="ghost"
        onClick={handleClear}
        disabled={!hasActiveFilters}
        className="ml-auto"
      >
        <ListSortDescending className="size-5" />
        Clear Filters
      </Button>
    </div>
  );
};

export default ProductFilters;
