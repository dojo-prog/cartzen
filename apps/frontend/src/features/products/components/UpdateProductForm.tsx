import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { X, ImagePlus } from "lucide-react";
import {
  UpdateProductBodySchema,
  type ProductWithRelations,
  type UpdateProductBody,
} from "@cartzen/shared";
import { useAllSubcategories } from "@/features/subcategories/hooks/useAllSubcategories";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import ButtonLoading from "@/components/common/ButtonLoading";
import { FieldError } from "@/components/ui/field";
import { useForm } from "react-hook-form";

type Props = {
  product: ProductWithRelations;
  onSuccess: () => void;
};

const UpdateProductForm = ({ product, onSuccess }: Props) => {
  const { data: subcategories } = useAllSubcategories();
  const { mutate: updateProduct, isPending } = useUpdateProduct();

  const [thumbnail, setThumbnail] = useState<File | undefined>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    product.thumbnail_url ?? null,
  );

  const form = useForm({
    resolver: zodResolver(UpdateProductBodySchema),

    defaultValues: {
      subcategoryId: product.subcategory.id,
      name: product.name,
      description: product.description,
      rawPrice: product.price_cents / 100,
      currency: product.currency,
      weightGrams: product.weight_grams,
      isActive: product.is_active ? "true" : "false",
    },
  });

  const isActive = form.watch("isActive");
  const currency = form.watch("currency");
  const subcategoryId = form.watch("subcategoryId");

  useEffect(() => {
    form.reset({
      subcategoryId: product.subcategory.id,
      name: product.name,
      description: product.description,
      rawPrice: product.price_cents / 100,
      currency: product.currency,
      weightGrams: product.weight_grams,
      isActive: product.is_active ? "true" : "false",
    });

    setThumbnail(undefined);
    setPreviewUrl(product.thumbnail_url ?? null);
  }, [product, form]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setThumbnail(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const removeThumbnail = () => {
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setThumbnail(undefined);
    setPreviewUrl(null);
  };

  const onSubmit = (data: UpdateProductBody) => {
    updateProduct(
      {
        productId: product.id,
        body: { ...data, thumbnail },
      },
      {
        onSuccess,
      },
    );
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {/* Product Information */}
      <div className="space-y-6">
        <div>
          <h2 className="text-base font-semibold">Product Information</h2>
          <p className="text-sm text-muted-foreground">
            Update the basic information for your product.
          </p>
        </div>

        {/* Product Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Product Name
          </label>

          <Input
            id="name"
            placeholder="Enter product name"
            {...form.register("name")}
          />

          <FieldError errors={[form.formState.errors.name]} />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>

          <Textarea
            id="description"
            placeholder="Describe your product..."
            className="min-h-32 resize-none"
            {...form.register("description")}
          />

          <FieldError errors={[form.formState.errors.description]} />
        </div>

        {/* Subcategory */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Subcategory</label>

          <Select
            value={subcategoryId}
            onValueChange={(value) => {
              if (!value) return;

              form.setValue("subcategoryId", value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {subcategories?.find(
                  (subcategory) => subcategory.id === subcategoryId,
                )?.name ?? product.subcategory.name}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              {subcategories?.map((subcategory) => (
                <SelectItem key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FieldError errors={[form.formState.errors.subcategoryId]} />
        </div>
      </div>

      {/* Pricing & Inventory */}
      <div className="space-y-6">
        <div>
          <h2 className="text-base font-semibold">Pricing & Inventory</h2>

          <p className="text-sm text-muted-foreground">
            Configure pricing and product weight.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Price */}
          <div className="space-y-2">
            <label htmlFor="rawPrice" className="text-sm font-medium">
              Price
            </label>

            <div className="flex gap-2">
              <Select
                value={currency}
                onValueChange={(value) => {
                  if (!value) return;

                  form.setValue("currency", value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              >
                <SelectTrigger className="w-24 shrink-0">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="PHP">PHP</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>

              <Input
                id="rawPrice"
                type="number"
                min="0"
                step="1"
                placeholder="0"
                {...form.register("rawPrice", {
                  valueAsNumber: true,
                })}
              />
            </div>

            <FieldError errors={[form.formState.errors.rawPrice]} />
          </div>

          {/* Weight */}
          <div className="space-y-2">
            <label htmlFor="weightGrams" className="text-sm font-medium">
              Weight (grams)
            </label>

            <Input
              id="weightGrams"
              type="number"
              min="0"
              step="1"
              placeholder="0"
              {...form.register("weightGrams", {
                valueAsNumber: true,
              })}
            />

            <FieldError errors={[form.formState.errors.weightGrams]} />
          </div>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="space-y-6">
        <div>
          <h2 className="text-base font-semibold">Product Thumbnail</h2>

          <p className="text-sm text-muted-foreground">
            Upload a new image to replace the current thumbnail.
          </p>
        </div>

        {previewUrl ? (
          <div className="relative w-fit">
            <div className="size-40 overflow-hidden rounded-lg border bg-muted">
              <img
                src={previewUrl}
                alt="Product preview"
                className="h-full w-full object-cover"
              />
            </div>

            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -right-2 -top-2 size-7 rounded-full"
              onClick={removeThumbnail}
            >
              <X className="size-4" />
            </Button>
          </div>
        ) : (
          <label
            htmlFor="thumbnail"
            className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 transition-colors hover:bg-muted/40"
          >
            <ImagePlus className="mb-3 size-8 text-muted-foreground" />

            <p className="text-sm font-medium">Click to upload</p>

            <p className="mt-1 text-xs text-muted-foreground">
              PNG, JPG or WEBP
            </p>

            <input
              id="thumbnail"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handleThumbnailChange}
            />
          </label>
        )}
      </div>

      {/* Status */}
      <div className="space-y-6">
        <div>
          <h2 className="text-base font-semibold">Product Status</h2>

          <p className="text-sm text-muted-foreground">
            Control whether this product is available to customers.
          </p>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Active</p>

            <p className="text-sm text-muted-foreground">
              Active products are visible in the storefront.
            </p>
          </div>

          <Switch
            checked={isActive === "true"}
            onCheckedChange={(checked) =>
              form.setValue("isActive", checked ? "true" : "false", {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            form.reset();
            setThumbnail(undefined);

            if (previewUrl?.startsWith("blob:")) {
              URL.revokeObjectURL(previewUrl);
            }

            setPreviewUrl(product.thumbnail_url ?? null);
          }}
          disabled={isPending}
        >
          Reset
        </Button>

        <Button type="submit" disabled={isPending}>
          <ButtonLoading btnTitle="Update Product" isLoading={isPending} />
        </Button>
      </div>
    </form>
  );
};

export default UpdateProductForm;
