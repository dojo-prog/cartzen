import { formatDateTime } from "@/utils/formatDateTime";
import { formatOrderId } from "@/utils/formatOrderId";
import type { GetStatusConfigResult } from "@/utils/getStatusConfig";
import type { OrderWithItems } from "@cartzen/shared";
import type { LucideIcon } from "lucide-react";

type Props = {
  order: OrderWithItems;
  status: GetStatusConfigResult;
  StatusIcon: LucideIcon;
};

const Header = ({ order, status, StatusIcon }: Props) => {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          Order {formatOrderId(order.id)}
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Order Details
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Placed on {formatDateTime(order.created_at)}
        </p>
      </div>

      <div
        className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium ${status.className}`}
      >
        <StatusIcon className="size-4" />
        {status.label}
      </div>
    </div>
  );
};

export default Header;
