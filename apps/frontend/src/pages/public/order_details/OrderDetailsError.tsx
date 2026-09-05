import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Package } from "lucide-react";
import { Link } from "react-router-dom";

const OrderDetailsError = () => {
  return (
    <div className="container mx-auto flex min-h-[60vh] max-w-lg items-center justify-center px-4 py-10">
      <Card className="w-full">
        <CardContent className="flex flex-col items-center px-6 py-12 text-center">
          <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-destructive/10">
            <Package className="size-8 text-destructive" />
          </div>

          <h1 className="text-xl font-semibold">Order not found</h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            We couldn't find the order you're looking for. It may have been
            removed or you may not have permission to view it.
          </p>

          <Button className="mt-6" variant="outline">
            <Link to="/orders" className="flex items-center">
              <ArrowLeft className="mr-2 size-4" />
              Back to Orders
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailsError;
