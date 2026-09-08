import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddSubcategoryForm from "./AddSubcategoryForm";

const AddSubcategoryButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm">
            <Plus className="mr-2 size-4" />
            Add Subcategory
          </Button>
        }
      />

      <DialogContent className={"w-sm"}>
        <DialogTitle>Add Subcategory</DialogTitle>

        <AddSubcategoryForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddSubcategoryButton;
