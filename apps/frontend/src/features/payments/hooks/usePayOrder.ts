import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { payOrder } from "../api/payment.api";
import type { PaginatedResult } from "@/types/common";
import type { OrderWithItems } from "@cartzen/shared";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

type OrdersPage = PaginatedResult<"orders", OrderWithItems>;

export const usePayOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payOrder,

    onSuccess: (updatedOrder) => {
      queryClient.setQueriesData<InfiniteData<OrdersPage>>(
        { queryKey: ["user-orders"] },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              orders: page.orders.map((o) =>
                o.id === updatedOrder.id ? updatedOrder : o,
              ),
            })),
          };
        },
      );

      queryClient.setQueriesData<InfiniteData<OrdersPage>>(
        { queryKey: ["orders"] },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              orders: page.orders.map((o) =>
                o.id === updatedOrder.id ? updatedOrder : o,
              ),
            })),
          };
        },
      );

      toast.success("Payment successfull");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
