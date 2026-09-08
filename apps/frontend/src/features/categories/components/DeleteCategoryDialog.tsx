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
import type { Category } from "@cartzen/shared";
import ButtonLoading from "@/components/common/ButtonLoading";
import { useDeleteCategory } from "../hooks/useDeleteCategory";

type Props = {
  category: Category;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DeleteCategoryDialog = ({ category, open, onOpenChange }: Props) => {
  const { mutate: deleteCategory, isPending } = useDeleteCategory();

  const handleDeleteCategory = () => {
    deleteCategory(category.id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  if (!category) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`Delete category ${category.name}?`}</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            category from our servers incuding all subcategories under it.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={"destructive"}
            onClick={handleDeleteCategory}
          >
            <ButtonLoading btnTitle="Delete Category" isLoading={isPending} />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCategoryDialog;
