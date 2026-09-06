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
import { formatPrice } from "@/utils/formatPrice";
import type { ProductWithRelations } from "@cartzen/shared";
import { MoreHorizontal, Package } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  products: ProductWithRelations[];
};

const ProductTable = ({ products }: Props) => {
  return (
    <CardContent className="p-0">
      <div
        className="max-h-[calc(100vh-10rem)] overflow-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 bg-background">
            <tr className="border-b bg-muted/30">
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                Product
              </th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                Category
              </th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                Price
              </th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                Stock
              </th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                Status
              </th>
              <th className="w-12 px-6 py-3" />
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              const status =
                product.stock_quantity > 0 ? "Active" : "Out of Stock";

              return (
                <tr
                  key={product.id}
                  className="border-b last:border-0 transition-colors hover:bg-muted/30"
                >
                  {/* Product */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
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
                        <p className="text-xs text-muted-foreground">
                          #{product.id.padStart(6, "0")}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 text-muted-foreground">
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
                          : status === "Out of Stock"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {status}
                    </Badge>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                          <span className="sr-only">Open product actions</span>
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link to={`/admin/products/${product.id}/edit`}>
                            Edit product
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem>View product</DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="text-destructive focus:text-destructive">
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
  );
};

export default ProductTable;
