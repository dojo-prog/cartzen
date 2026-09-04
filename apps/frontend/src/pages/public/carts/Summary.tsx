import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils/formatPrice";
import { useNavigate } from "react-router-dom";

type Props = {
  subtotal: number;
};

const Summary = ({ subtotal }: Props) => {
  const navigate = useNavigate();

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(subtotal ? subtotal * 100 : 0, "PHP")}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>Calculated at checkout</span>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>{formatPrice(subtotal ? subtotal * 100 : 0, "PHP")}</span>
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </Button>
      </CardContent>
    </Card>
  );
};

export default Summary;
