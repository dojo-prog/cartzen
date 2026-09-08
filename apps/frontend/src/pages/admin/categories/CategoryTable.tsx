import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddCategoryButton from "@/features/categories/components/AddCategoryButton";
import DeleteCategoryDialog from "@/features/categories/components/DeleteCategoryDialog";
import type { Category } from "@cartzen/shared";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type Props = {
  categories: Category[];
};

const CategoryTable = ({ categories }: Props) => {
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(
    null,
  );

  return (
    <>
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
                        className="size-8 text-destructive hover:text-destructive"
                        title="Delete category"
                        onClick={() => setDeletingCategory(category)}
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
          <AddCategoryButton />
        </div>
      </div>

      {deletingCategory && (
        <DeleteCategoryDialog
          category={deletingCategory}
          open={!!deletingCategory}
          onOpenChange={() => setDeletingCategory(null)}
        />
      )}
    </>
  );
};

export default CategoryTable;
