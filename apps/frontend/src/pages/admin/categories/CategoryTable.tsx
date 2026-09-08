import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Category } from "@cartzen/shared";
import { Pencil, Plus, Trash2 } from "lucide-react";

type Props = {
  categories: Category[];
};

const CategoryTable = ({ categories }: Props) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-6">Name</TableHead>
            <TableHead className="px-6">Slug</TableHead>
            <TableHead className="px-6 w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="h-24 text-center text-sm text-muted-foreground"
              >
                No categories found.
              </TableCell>
            </TableRow>
          ) : (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="px-6 font-medium">
                  {category.name}
                </TableCell>

                <TableCell className="px-6 text-muted-foreground">
                  {category.slug}
                </TableCell>

                <TableCell className="px-6 ">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      title="Edit category"
                    >
                      <Pencil className="size-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-destructive hover:text-destructive"
                      title="Delete category"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="border-t p-3">
        <Button variant="outline" size="sm">
          <Plus className="mr-2 size-4" />
          Add Category
        </Button>
      </div>
    </div>
  );
};

export default CategoryTable;
