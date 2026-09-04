import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreateAddressBodySchema,
  type CreateAddressBody,
} from "@cartzen/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateAddress } from "../hooks/useCreateAddress";
import ButtonLoading from "@/components/common/ButtonLoading";

const AddAddressForm = () => {
  const form = useForm<CreateAddressBody>({
    resolver: zodResolver(CreateAddressBodySchema),
    defaultValues: {
      region: "",
      province: "",
      city: "",
      barangay: "",
      addressLine: "",
    },
  });

  const { mutate: addAddress, isPending } = useCreateAddress();

  const onSubmit = async (data: CreateAddressBody) => {
    addAddress(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Input
                id="region"
                placeholder="NCR"
                {...form.register("region")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="province">Province</Label>
              <Input
                id="province"
                placeholder="Metro Manila"
                {...form.register("province")}
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Quezon City"
                {...form.register("city")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="barangay">Barangay</Label>
              <Input
                id="barangay"
                placeholder="Bagong Pag-asa"
                {...form.register("barangay")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address_line">Address</Label>

            <Input
              id="address_line"
              placeholder="House number, street, building/unit"
              {...form.register("addressLine")}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" size={"lg"} disabled={isPending}>
              <ButtonLoading btnTitle="Add Address" isLoading={isPending} />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddAddressForm;
