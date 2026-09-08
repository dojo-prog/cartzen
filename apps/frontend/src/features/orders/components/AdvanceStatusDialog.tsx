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
import { useAdvanceStatus } from "../hooks/useAdvanceStatus";

type Props = {
  order: OrderWithItems;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const AdvanceStatusDialog = ({ order, open, onOpenChange }: Props) => {
  const { mutate: advanceStatus, isPending } = useAdvanceStatus();

  if (!order) return null;

  const statusMap: Partial<Record<OrderStatus, OrderStatus>> = {
    paid: "processing",
    processing: "shipped",
    shipped: "delivered",
  };

  const nextStatus = statusMap[order.status];

  const handleAdvanceStatus = () => {
    advanceStatus(order.id, {
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
          <AlertDialogTitle>{`Set this order's status to ${nextStatus}?`}</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently update the
            order's status from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant={"default"} onClick={handleAdvanceStatus}>
            <ButtonLoading btnTitle="Advance Status" isLoading={isPending} />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AdvanceStatusDialog;
