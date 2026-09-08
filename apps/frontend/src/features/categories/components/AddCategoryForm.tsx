import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreateCategoryBodySchema,
  type CreateCategoryBody,
} from "@cartzen/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateCategory } from "../hooks/useCreateCategory";
import ButtonLoading from "@/components/common/ButtonLoading";

type Props = {
  onSuccess: () => void;
};

const AddCategoryForm = ({ onSuccess }: Props) => {
  const { mutate: createCategory, isPending } = useCreateCategory();

  const form = useForm({
    resolver: zodResolver(CreateCategoryBodySchema),

    defaultValues: {
      name: "",
    },
  });

  const name = form.watch("name");

  const onSubmit = (data: CreateCategoryBody) => {
    createCategory(data, {
      onSuccess,
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="category-name">Category Name</Label>

        <Input
          id="category-name"
          placeholder="e.g. Electronics"
          disabled={isPending}
          {...form.register("name")}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isPending || !name.trim()}
      >
        <ButtonLoading btnTitle="Add Category" isLoading={isPending} />
      </Button>
    </form>
  );
};

export default AddCategoryForm;
