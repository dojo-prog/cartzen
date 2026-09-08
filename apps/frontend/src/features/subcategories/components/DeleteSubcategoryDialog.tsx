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
import type { SubcategoryWithRelations } from "@cartzen/shared";
import ButtonLoading from "@/components/common/ButtonLoading";
import { useDeleteSubcategory } from "../hooks/useDeleteSubcategory";

type Props = {
  subcategory: SubcategoryWithRelations;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DeleteSubcategoryDialog = ({
  subcategory,
  open,
  onOpenChange,
}: Props) => {
  const { mutate: deleteSubcategory, isPending } = useDeleteSubcategory();

  const handleDeleteSubcategory = () => {
    deleteSubcategory(subcategory.id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  if (!subcategory) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`Delete subcategory ${subcategory.name}?`}</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            subcategory from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={"destructive"}
            onClick={handleDeleteSubcategory}
          >
            <ButtonLoading btnTitle="Delete Category" isLoading={isPending} />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSubcategoryDialog;
