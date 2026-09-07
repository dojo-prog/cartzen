import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDateTime } from "@/utils/formatDateTime";
import { formatPrice } from "@/utils/formatPrice";
import type { ProductWithRelations } from "@cartzen/shared";

type Props = {
  product: ProductWithRelations | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ViewProductDialog = ({ product, open, onOpenChange }: Props) => {
  if (!product) return null;

  const createdAt = formatDateTime(product.created_at);
  const updatedAt = formatDateTime(product.updated_at);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>

          <DialogDescription>
            Product details and current inventory information.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Thumbnail + Basic Info */}
          <div className="flex gap-5">
            <div className="shrink-0">
              {product.thumbnail_url ? (
                <img
                  src={product.thumbnail_url}
                  alt={product.name}
                  className="h-32 w-32 rounded-md border object-cover"
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-md border text-sm text-muted-foreground">
                  No image
                </div>
              )}
            </div>

            <div className="grid flex-1 gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{product.name}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="text-sm">{product.description}</p>
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Category</p>
              <p className="font-medium">{product.category.name}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Subcategory</p>
              <p className="font-medium">{product.subcategory.name}</p>
            </div>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="font-medium">{formatPrice(product.price_cents)}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Weight</p>
              <p className="font-medium">{product.weight_grams} g</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Stock</p>
              <p className="font-medium">{product.stock_quantity} units</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Currency</p>
              <p className="font-medium">{product.currency}</p>
            </div>
          </div>

          {/* Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-medium">
                {product.is_active ? "Active" : "Inactive"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Featured</p>
              <p className="font-medium">
                {product.is_featured ? "Yes" : "No"}
              </p>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Created</p>
              <p className="text-sm">{createdAt}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="text-sm">{updatedAt}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="justify-end">
          <AlertDialogCancel>Close</AlertDialogCancel>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProductDialog;
