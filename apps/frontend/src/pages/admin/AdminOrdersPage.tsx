import { useState } from "react";

import type { OrderQuery } from "@cartzen/shared";

import { useDebounce } from "@/hooks/useDebounce";
import { Card } from "@/components/ui/card";
import Header from "./orders/Header";
import OrderTableHeader from "./orders/OrderTableHeader";
import OrdersTable from "./orders/OrdersTable";
import { useAdminOrders } from "@/features/orders/hooks/useAdminOrders";

const AdminOrdersPage = () => {
  const [filters, setFilters] = useState<OrderQuery>({
    page: 1,
    limit: 10,
    search: "",
  });

  const { page, limit, search } = filters;

  const debouncedSearch = useDebounce(search);

  const {
    data: orderData,
    isPending,
    isError,
  } = useAdminOrders({
    page,
    limit,
    search: debouncedSearch,
  });

  if (isPending || isError) return null;

  const { orders, pagination } = orderData;

  return (
    <div className="space-y-6">
      <Header />

      {/* <StatusCards /> */}

      {/* Orders */}
      <Card>
        <OrderTableHeader
          search={search ?? ""}
          onSearchChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              search: value,
              page: 1,
            }))
          }
          onPageChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              page: value,
            }))
          }
          pagination={pagination}
        />

        <OrdersTable orders={orders} />
      </Card>
    </div>
  );
};

export default AdminOrdersPage;
