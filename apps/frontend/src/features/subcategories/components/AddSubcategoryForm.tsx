import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreateSubcategoryBodySchema,
  type CreateSubcategoryBody,
} from "@cartzen/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateSubcategory } from "../hooks/useCreateSubcategory";
import { useAllCategories } from "@/features/categories/hooks/useAllCategories";
import ButtonLoading from "@/components/common/ButtonLoading";

type Props = {
  onSuccess: () => void;
};

const AddSubcategoryForm = ({ onSuccess }: Props) => {
  const { data: categories } = useAllCategories();
  const { mutate: addSubcategory, isPending } = useCreateSubcategory();

  const form = useForm({
    resolver: zodResolver(CreateSubcategoryBodySchema),

    defaultValues: {
      name: "",
      categoryId: "",
    },
  });

  const name = form.watch("name");
  const categoryId = form.watch("categoryId");

  const onSubmit = (data: CreateSubcategoryBody) => {
    addSubcategory(data, {
      onSuccess,
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="subcategory-name">Subcategory Name</Label>

        <Input
          id="subcategory-name"
          placeholder="e.g. Smartphones"
          disabled={isPending}
          {...form.register("name")}
        />

        <FieldError errors={[form.formState.errors.name]} />
      </div>

      <div className="space-y-2">
        <Label>Category</Label>

        <Select
          value={categoryId}
          onValueChange={(value) => {
            if (!value) return;
            form.setValue("categoryId", value, {
              shouldValidate: true,
            });
          }}
        >
          <SelectTrigger>
            <SelectValue>
              {categories?.find((c) => c.id === categoryId)?.name ??
                "Select a category"}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {categories &&
              categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isPending || !name.trim() || !categoryId}
      >
        <ButtonLoading btnTitle="Add Subcategory" isLoading={isPending} />
      </Button>
    </form>
  );
};

export default AddSubcategoryForm;
