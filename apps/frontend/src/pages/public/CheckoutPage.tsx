import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import ShippingAddressSelector from "./checkout/ShippingAddressSelector";
import { useAddresses } from "@/features/addresses/hooks/useAddresses";
import { useAllCartItems } from "@/features/carts/hooks/useAllCartItems";
import { useCalculateShipping } from "@/features/shippings/hooks/useCalculateShipping";
import { useShipping } from "@/features/shippings/hooks/useShipping";
import { useStore } from "@/features/stores/hooks/useStore";
import ShippingDetails from "./checkout/ShippingDetails";
import StoreDetails from "./checkout/StoreDetails";
import CartItems from "./checkout/CartItems";
import SummaryTotal from "./checkout/SummaryTotal";
import CartEmpty from "./checkout/CartEmpty";
import { useCheckout } from "@/features/orders/hooks/useCheckout";
import ButtonLoading from "@/components/common/ButtonLoading";

const CheckoutPage = () => {
  const { data: addresses } = useAddresses();
  const { data: cartItems } = useAllCartItems();
  const { data: storeDetails } = useStore();
  const { data: shippingDetails } = useShipping();

  const [selectedAddressId, setSelectedAddressId] = useState<
    string | undefined
  >();

  const { data: shippingCalculation } = useCalculateShipping(selectedAddressId);

  const { mutate: checkout, isPending: checkingOut } = useCheckout();

  // Totals
  const subtotal =
    cartItems?.reduce(
      (total, item) => total + item.product.price_cents * item.quantity,
      0,
    ) ?? 0;
  const shippingFee = shippingCalculation?.shipping_fee_cents ?? 0;
  const total = subtotal + shippingFee;

  // Handlers
  const handleCheckout = () => {
    if (!selectedAddressId) return;

    checkout({ address_id: selectedAddressId });
  };

  if (cartItems?.length === 0) return <CartEmpty />;

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Checkout</h1>

        <p className="text-muted-foreground">
          Review your order and choose a shipping address.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Left */}
        <div className="space-y-6">
          <ShippingAddressSelector
            addresses={addresses ?? []}
            selectedAddressId={selectedAddressId}
            onSelect={setSelectedAddressId}
          />

          {/* Shipping Details */}
          <ShippingDetails
            shippingDetails={shippingDetails}
            shippingCalculation={shippingCalculation}
          />

          {/* Store / Origin */}
          <StoreDetails storeDetails={storeDetails} />
        </div>

        {/* Right */}
        <Card className="h-fit lg:sticky lg:top-6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Cart Items */}
            <CartItems />

            <Separator />

            {/* Totals */}
            <SummaryTotal
              selectedAddressId={selectedAddressId}
              shippingCalculation={shippingCalculation}
              subtotal={subtotal}
              shippingFee={shippingFee}
              total={total}
            />

            {/* Place Order Button */}
            <Button
              className="w-full"
              size="lg"
              disabled={
                !selectedAddressId || !shippingCalculation || checkingOut
              }
              onClick={handleCheckout}
            >
              <ButtonLoading btnTitle={"Place Order"} isLoading={checkingOut} />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
