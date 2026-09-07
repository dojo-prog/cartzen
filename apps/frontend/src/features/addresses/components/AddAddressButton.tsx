import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddAddressForm from "./AddAddressForm";

const AddAddressButton = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button type="button" size="lg" onClick={() => setOpen(true)}>
            <Plus className="mr-2 size-4" />
            Add Address
          </Button>
        }
      />

      <DialogContent className={"w-lg"}>
        <DialogTitle className={"text-lg font-semibold"}>
          Add Shipping Address
        </DialogTitle>

        <AddAddressForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressButton;
