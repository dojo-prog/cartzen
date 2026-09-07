import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useState } from "react";
import UpdateAddressForm from "./UpdateAddressForm";
import type { UserAddress } from "@cartzen/shared";

type Props = {
  address: UserAddress;
};

const UpdateAddressButton = ({ address }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Edit address"
            className={"hover:text-blue-500"}
          >
            <Pencil className="size-4" />
          </Button>
        }
      />

      <DialogContent className={"w-lg"}>
        <DialogTitle className={"text-lg font-semibold"}>
          Add Shipping Address
        </DialogTitle>

        <UpdateAddressForm address={address} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAddressButton;
