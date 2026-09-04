import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { usePayOrder } from "@/features/payments/hooks/usePayOrder";
import ProcessingPayment from "./payments/ProcessingPayment";
import PaymentSuccess from "./payments/PaymentSuccess";
import PaymentFailed from "./payments/PaymentFailed";

type PaymentStatus = "processing" | "success" | "failed";

const PaymentsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [status, setStatus] = useState<PaymentStatus>("processing");

  const hasProcessedPayment = useRef(false);

  const { mutateAsync: payOrder, isPending } = usePayOrder();

  useEffect(() => {
    if (!orderId || hasProcessedPayment.current) {
      if (!orderId) {
        setStatus("failed");
      }

      return;
    }

    hasProcessedPayment.current = true;

    const processPayment = async () => {
      try {
        await payOrder(orderId);
        setStatus("success");
      } catch {
        setStatus("failed");
      }
    };

    processPayment();
  }, [orderId, payOrder]);

  const isProcessing = status === "processing" || isPending;

  return (
    <div className="container mx-auto flex min-h-[75vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg overflow-hidden">
        <CardContent className="px-6 py-12 sm:px-10">
          {/* Processing */}
          {isProcessing && <ProcessingPayment orderId={orderId} />}

          {/* Success */}
          {status === "success" && !isPending && (
            <PaymentSuccess orderId={orderId} />
          )}

          {/* Failed */}
          {status === "failed" && <PaymentFailed orderId={orderId} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsPage;
