import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { ProductWithRelations } from "@cartzen/shared";
import UpdateProductForm from "./UpdateProductForm";

type Props = {
  product: ProductWithRelations | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const UpdateProductDialog = ({ product, open, onOpenChange }: Props) => {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-xl max-h-[90vh] overflow-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        <DialogTitle className={"text-lg font-semibold"}>
          Update Existing Product
        </DialogTitle>

        <UpdateProductForm
          product={product}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductDialog;
