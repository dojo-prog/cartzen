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
import { MoreHorizontal, Package } from "lucide-react";
import { Link } from "react-router-dom";

const ProductTable = () => {
  const products = [
    {
      id: "1",
      name: "Classic White Sneakers",
      category: "Footwear",
      price: "$59.99",
      stock: 24,
      status: "Active",
    },
    {
      id: "2",
      name: "Premium Leather Wallet",
      category: "Accessories",
      price: "$39.99",
      stock: 12,
      status: "Active",
    },
    {
      id: "3",
      name: "Everyday Backpack",
      category: "Bags",
      price: "$74.99",
      stock: 0,
      status: "Out of Stock",
    },
    {
      id: "4",
      name: "Minimalist Watch",
      category: "Accessories",
      price: "$129.99",
      stock: 8,
      status: "Active",
    },
    {
      id: "5",
      name: "Cotton Essential Tee",
      category: "Clothing",
      price: "$24.99",
      stock: 35,
      status: "Inactive",
    },
  ];

  return (
    <CardContent className="p-0">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
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
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b last:border-0 transition-colors hover:bg-muted/30"
              >
                {/* Product */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
                      <Package className="size-5 text-muted-foreground" />
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
                  {product.category}
                </td>

                {/* Price */}
                <td className="px-6 py-4 font-medium">{product.price}</td>

                {/* Stock */}
                <td className="px-6 py-4">
                  <span
                    className={
                      product.stock === 0
                        ? "font-medium text-destructive"
                        : "text-muted-foreground"
                    }
                  >
                    {product.stock}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <Badge
                    variant={
                      product.status === "Active"
                        ? "default"
                        : product.status === "Out of Stock"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {product.status}
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
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  );
};

export default ProductTable;
