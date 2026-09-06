import Pagination from "@/components/common/Pagination";
import SearchInput from "@/components/common/SearchInput";
import { CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
  onPageChange: (value: number) => void;
};

const ProductTableHeader = ({
  search,
  onSearchChange,
  pagination,
  onPageChange,
}: Props) => {
  const { page, total_pages } = pagination;

  return (
    <CardHeader className="border-b">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <CardTitle className="text-base">All Products</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            View and manage your product catalog.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <SearchInput
            value={search}
            onChange={onSearchChange}
            placeholder="Search product name..."
          />

          <Pagination
            page={page}
            totalPages={total_pages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </CardHeader>
  );
};

export default ProductTableHeader;
