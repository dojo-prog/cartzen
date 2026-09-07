import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddProductForm from "./AddProductForm";

const AddProductButton = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button type="button" size="lg" onClick={() => setOpen(true)}>
            <Plus className="mr-2 size-4" />
            Add Product
          </Button>
        }
      />

      <DialogContent
        className="w-xl max-h-[90vh] overflow-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        <DialogTitle className={"text-lg font-semibold"}>
          Add New Product
        </DialogTitle>

        <AddProductForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddProductButton;
