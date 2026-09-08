import ButtonLoading from "@/components/common/ButtonLoading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { OrderStatus, OrderWithItems } from "@cartzen/shared";
import { useAdminCancelOrder } from "../hooks/useAdminCancelOrder";

type Props = {
  order: OrderWithItems;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const AdminCancelOrderDialog = ({ order, open, onOpenChange }: Props) => {
  const { mutate: cancelOrder, isPending } = useAdminCancelOrder();

  if (!order) return null;

  const statusMap: Partial<Record<OrderStatus, OrderStatus>> = {
    paid: "processing",
    processing: "shipped",
    shipped: "delivered",
  };

  const nextStatus = statusMap[order.status];

  const handleCancelOrder = () => {
    cancelOrder(order.id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  console.log(nextStatus);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`Are you sure you want to cancel this order?`}</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently set the order's
            status to cancelled from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={"destructive"}
            onClick={handleCancelOrder}
          >
            <ButtonLoading btnTitle="Cancel Order" isLoading={isPending} />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AdminCancelOrderDialog;
