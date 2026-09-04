import { useUserOrders } from "@/features/orders/hooks/useUserOrders";
import OrdersEmpty from "./orders/OrdersEmpty";
import OrderCard from "@/features/orders/components/OrderCard";
import { useScroll } from "@/hooks/useScroll";

const OrdersPage = () => {
  const {
    data: ordersData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useUserOrders({ page: 1, limit: 10 });

  const { observerRef } = useScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const orders = ordersData?.pages.flatMap((page) => page.orders) ?? [];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
        <p className="mt-2 text-muted-foreground">
          View your order history and track your purchases.
        </p>
      </div>

      {/* Empty state */}
      {orders && orders?.length === 0 ? (
        <OrdersEmpty />
      ) : (
        orders && (
          <div className="space-y-5">
            {orders.map((order) => (
              <OrderCard order={order} />
            ))}

            {/* Sentinel */}
            <div ref={observerRef} className="h-1" />
          </div>
        )
      )}
    </div>
  );
};

export default OrdersPage;
