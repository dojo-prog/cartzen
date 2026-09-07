import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteProductDialog from "@/features/products/components/DeleteProductDialog";
import UpdateProductDialog from "@/features/products/components/UpdateProductDialog";
import { useToggleFeatured } from "@/features/products/hooks/useToggleFeatured";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/formatPrice";
import type { ProductWithRelations } from "@cartzen/shared";
import { MoreHorizontal, Package, Star } from "lucide-react";
import { useState } from "react";

type Props = {
  products: ProductWithRelations[];
};

const ProductTable = ({ products }: Props) => {
  const { mutate: toggleFeatured, isPending } = useToggleFeatured();

  const [editingProduct, setEditingProduct] =
    useState<ProductWithRelations | null>(null);

  const [deletingProduct, setDeletingProduct] =
    useState<ProductWithRelations | null>(null);

  return (
    <>
      <CardContent className="p-0">
        <div className="w-full">
          <table className="w-full table-fixed text-sm">
            <thead className="bg-background">
              <tr className="border-b bg-muted/30">
                <th className="w-[35%] px-6 py-3 text-left font-medium text-muted-foreground">
                  Product
                </th>

                <th className="w-[18%] px-6 py-3 text-left font-medium text-muted-foreground">
                  Category
                </th>

                <th className="w-[15%] px-6 py-3 text-left font-medium text-muted-foreground">
                  Price
                </th>

                <th className="w-[10%] px-6 py-3 text-left font-medium text-muted-foreground">
                  Stock
                </th>

                <th className="w-[15%] px-6 py-3 text-left font-medium text-muted-foreground">
                  Status
                </th>

                <th className="w-[15%] px-6 py-3 text-left font-medium text-muted-foreground">
                  Featured
                </th>

                <th className="w-[7%] px-6 py-3" />
              </tr>
            </thead>

            <tbody>
              {products.map((product) => {
                const status =
                  product.stock_quantity > 0
                    ? product.is_active
                      ? "Active"
                      : "Inactive"
                    : "Out of Stock";

                return (
                  <tr
                    key={product.id}
                    className="border-b transition-colors last:border-0 hover:bg-muted/30"
                  >
                    {/* Product */}
                    <td className="px-6 py-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
                          {product.thumbnail_url ? (
                            <img
                              src={product.thumbnail_url}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Package className="size-5 text-muted-foreground" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-medium">{product.name}</p>

                          <p className="truncate text-xs text-muted-foreground">
                            #{product.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="truncate px-6 py-4 text-muted-foreground">
                      {product.category.name}
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 font-medium">
                      {formatPrice(product.price_cents)}
                    </td>

                    {/* Stock */}
                    <td className="px-6 py-4">
                      <span
                        className={
                          product.stock_quantity === 0
                            ? "font-medium text-destructive"
                            : "text-muted-foreground"
                        }
                      >
                        {product.stock_quantity}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          status === "Active"
                            ? "default"
                            : status === "Inactive"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {status}
                      </Badge>
                    </td>

                    <td className="px-6 py-4">
                      <Button
                        onClick={() => toggleFeatured(product.id)}
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          product.is_featured
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary hover:bg-gray-200 border text-gray-400",
                        )}
                        disabled={isPending}
                      >
                        <Star className="size-5" />
                      </Button>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                          >
                            <MoreHorizontal className="size-4" />

                            <span className="sr-only">
                              Open product actions
                            </span>
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setEditingProduct(product)}
                          >
                            Edit Product
                          </DropdownMenuItem>

                          <DropdownMenuItem>View product</DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={() => setDeletingProduct(product)}
                            className="text-destructive focus:text-destructive"
                          >
                            Delete product
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>

      {editingProduct && (
        <UpdateProductDialog
          product={editingProduct}
          open={!!editingProduct}
          onOpenChange={(open) => {
            if (!open) setEditingProduct(null);
          }}
        />
      )}

      {deletingProduct && (
        <DeleteProductDialog
          product={deletingProduct}
          open={!!deletingProduct}
          onOpenChange={(open) => {
            if (!open) setDeletingProduct(null);
          }}
        />
      )}
    </>
  );
};

export default ProductTable;
