import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddCategoryForm from "./AddCategoryForm";
import { useState } from "react";

const AddCategoryButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm">
            <Plus className="mr-2 size-4" />
            Add Category
          </Button>
        }
      />

      <DialogContent className={"w-sm"}>
        <DialogTitle>Add Category</DialogTitle>

        <AddCategoryForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryButton;
