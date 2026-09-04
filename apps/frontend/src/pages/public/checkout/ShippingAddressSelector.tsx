import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { UserAddress } from "@cartzen/shared";
import { MapPin, Plus } from "lucide-react";

type Props = {
  addresses: UserAddress[];
  selectedAddressId?: string;
  onSelect: (addressId: string) => void;
  onAddAddress: () => void;
};

const ShippingAddressSelector = ({
  addresses,
  selectedAddressId,
  onSelect,
  onAddAddress,
}: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle>Shipping Address</CardTitle>

        {addresses.length > 0 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddAddress}
          >
            <Plus className="mr-2 size-4" />
            Add Address
          </Button>
        )}
      </CardHeader>

      <CardContent>
        {addresses.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed px-6 py-10 text-center">
            <div className="mb-4 rounded-full bg-muted p-3">
              <MapPin className="size-6 text-muted-foreground" />
            </div>

            <h3 className="font-medium">No shipping address</h3>

            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Add a shipping address before placing your order.
            </p>

            <Button type="button" className="mt-5" onClick={onAddAddress}>
              <Plus className="mr-2 size-4" />
              Add Shipping Address
            </Button>
          </div>
        ) : (
          <RadioGroup
            value={selectedAddressId}
            onValueChange={onSelect}
            className="space-y-3"
          >
            {addresses.map((address) => (
              <Label
                key={address.id}
                htmlFor={`address-${address.id}`}
                className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 hover:bg-muted/50"
              >
                <RadioGroupItem
                  id={`address-${address.id}`}
                  value={address.id}
                  className="mt-1"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Shipping Address</span>

                    {address.is_default && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        Default
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm">{address.address_line}</p>

                  <p className="text-sm text-muted-foreground">
                    {address.barangay}, {address.city}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {address.province}, {address.region}
                  </p>
                </div>
              </Label>
            ))}
          </RadioGroup>
        )}
      </CardContent>
    </Card>
  );
};

export default ShippingAddressSelector;
