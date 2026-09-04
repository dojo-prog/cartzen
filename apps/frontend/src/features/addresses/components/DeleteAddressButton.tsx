import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { UserAddress } from "@cartzen/shared";
import { Trash2 } from "lucide-react";
import { useDeleteAddress } from "../hooks/useDeleteAddress";
import ButtonLoading from "@/components/common/ButtonLoading";

type Props = {
  address: UserAddress;
};

const DeleteAddressButton = ({ address }: Props) => {
  const { mutate: deleteAddress, isPending } = useDeleteAddress();

  const handleDeleteAddress = () => {
    deleteAddress(address.id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Delete address"
            className={"hover:text-red-500"}
          >
            <Trash2 className="size-4" />
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this address?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            address from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={"destructive"}
            onClick={handleDeleteAddress}
          >
            <ButtonLoading btnTitle="Delete" isLoading={isPending} />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAddressButton;
