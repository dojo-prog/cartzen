import { Package } from "lucide-react";

const OrdersTableEmpty = () => {
  return (
    <tr>
      <td colSpan={7} className="h-48 px-6 text-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            <Package className="size-5 text-muted-foreground" />
          </div>

          <div>
            <p className="font-medium">No orders found</p>

            <p className="text-sm text-muted-foreground">
              Orders will appear here once customers place them.
            </p>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default OrdersTableEmpty;
