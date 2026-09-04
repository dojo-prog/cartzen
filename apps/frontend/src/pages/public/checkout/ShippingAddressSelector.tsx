import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AddAddressButton from "@/features/addresses/components/AddAddressButton";
import DeleteAddressButton from "@/features/addresses/components/DeleteAddressButton";
import UpdateAddressButton from "@/features/addresses/components/UpdateAddressButton";
import type { UserAddress } from "@cartzen/shared";
import { MapPin } from "lucide-react";

type Props = {
  addresses: UserAddress[];
  selectedAddressId?: string;
  onSelect: (addressId: string) => void;
};

const ShippingAddressSelector = ({
  addresses,
  selectedAddressId,
  onSelect,
}: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle>Shipping Address</CardTitle>
        {addresses.length > 0 && <AddAddressButton />}
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

            <div className="mt-8">
              <AddAddressButton />
            </div>
          </div>
        ) : (
          <RadioGroup
            value={selectedAddressId}
            onValueChange={onSelect}
            className="space-y-3"
          >
            {addresses.map((address) => (
              <div
                key={address.id}
                className="flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <Label
                  htmlFor={`address-${address.id}`}
                  className="flex min-w-0 flex-1 cursor-pointer items-start gap-3"
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

                <div className="flex shrink-0 items-center gap-1">
                  <UpdateAddressButton address={address} />

                  <DeleteAddressButton address={address} />
                </div>
              </div>
            ))}
          </RadioGroup>
        )}
      </CardContent>
    </Card>
  );
};

export default ShippingAddressSelector;
