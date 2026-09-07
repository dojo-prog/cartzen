import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { ProductWithRelations } from "@cartzen/shared";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import ButtonLoading from "@/components/common/ButtonLoading";

type Props = {
  product: ProductWithRelations;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DeleteProductDialog = ({ product, open, onOpenChange }: Props) => {
  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const handleDeleteProduct = () => {
    deleteProduct(product.id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  if (!product) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`Delete product ${product.name}?`}</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            product from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={"destructive"}
            onClick={handleDeleteProduct}
          >
            <ButtonLoading btnTitle="Delete Product" isLoading={isPending} />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProductDialog;
