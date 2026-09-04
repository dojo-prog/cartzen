import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Link } from "react-router-dom";

import ShippingAddressSelector from "./checkout/ShippingAddressSelector";
import { useAddresses } from "@/features/addresses/hooks/useAddresses";
import { useAllCartItems } from "@/features/carts/hooks/useAllCartItems";

const CheckoutPage = () => {
  const { data: addresses } = useAddresses();

  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses?.find((address) => address.is_default)?.id,
  );

  const { data: cartItems } = useAllCartItems();

  const subtotal = cartItems
    ? cartItems?.reduce(
        (total, item) =>
          total + (item.product.price_cents / 100) * item.quantity,
        0,
      )
    : 0;

  const shipping = subtotal > 0 ? 100 : 0;
  const total = subtotal + shipping;

  const handleAddAddress = () => {
    console.log("Add address");
  };

  if (cartItems?.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>

        <p className="mt-2 text-muted-foreground">
          Add some products before proceeding to checkout.
        </p>

        <Button className="mt-6">
          <Link to="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

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
            onAddAddress={handleAddAddress}
          />

          <Card>
            <CardHeader>
              <CardTitle>Payment</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground">
                Payment options will be available here.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right */}
        <Card className="h-fit lg:sticky lg:top-6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="space-y-4">
              {cartItems?.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="size-16 shrink-0 overflow-hidden rounded-md border">
                    <img
                      src={item.product.thumbnail_url}
                      alt={item.product.name}
                      className="size-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium">
                      {item.product.name}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm font-medium">
                    ₱
                    {(
                      (item.product.price_cents / 100) *
                      item.quantity
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>

                <span>
                  ₱
                  {subtotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>

                <span>
                  ₱
                  {shipping.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>

                <span>
                  ₱
                  {total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            <Button className="w-full" size="lg" disabled={!selectedAddressId}>
              Place Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
