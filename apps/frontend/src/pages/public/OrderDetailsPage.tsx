import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useUserOrder } from "@/features/orders/hooks/useUserOrder";
import { getStatusConfig } from "@/utils/getStatusConfig";
import OrderDetailsSkeleton from "./order_details/OrderDetailsSkeleton";
import OrderDetailsError from "./order_details/OrderDetailsError";
import Header from "./order_details/Header";
import OrderStatusCard from "./order_details/OrderStatusCard";
import OrderItemsCard from "./order_details/OrderItemsCard";
import DeliveryInformationCard from "./order_details/DeliveryInformationCard";
import OrderTimelineCard from "./order_details/OrderTimelineCard";
import OrderSummaryCard from "./order_details/OrderSummaryCard";

const OrderDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();

  const { data: order, isPending, isError } = useUserOrder(orderId);

  if (isPending) return <OrderDetailsSkeleton />;

  if (isError || !order) return <OrderDetailsError />;

  const status = getStatusConfig(order.status);
  const StatusIcon = status.icon;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-2 sm:py-4">
      {/* Back */}
      <Button variant="ghost" className="mb-6 -ml-2">
        <Link to="/orders" className="flex items-center">
          <ArrowLeft className="mr-2 size-4" />
          Back to Orders
        </Link>
      </Button>

      {/* Header */}
      <Header order={order} status={status} StatusIcon={StatusIcon} />

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Main content */}
        <div className="space-y-6">
          <OrderStatusCard
            order={order}
            status={status}
            StatusIcon={StatusIcon}
          />

          <OrderItemsCard order={order} />

          <DeliveryInformationCard order={order} />

          <OrderTimelineCard order={order} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <OrderSummaryCard order={order} />

          {/* Order information */}

          <Button variant="outline" className="w-full">
            <Link to="/products" className="flex items-center">
              <ShoppingBag className="mr-2 size-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
