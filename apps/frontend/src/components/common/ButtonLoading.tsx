import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Props = {
  btnTitle: string;
  isLoading: boolean;
  titleStyles?: string;
  loaderStyles?: string;
};

const ButtonLoading = ({
  btnTitle,
  isLoading,
  titleStyles,
  loaderStyles,
}: Props) => {
  return (
    <>
      {!isLoading ? (
        <span className={cn("text-sm", titleStyles)}>{btnTitle}</span>
      ) : (
        <Loader2 className={cn(`size-5 animate-spin`, loaderStyles)} />
      )}
    </>
  );
};

export default ButtonLoading;
