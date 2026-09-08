import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddSubcategoryButton from "@/features/subcategories/components/AddSubcategoryButton";
import type { SubcategoryWithRelations } from "@cartzen/shared";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  subcategories: SubcategoryWithRelations[];
};

const SubcategoryTable = ({ subcategories }: Props) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-6">Name</TableHead>
            <TableHead className="px-6">Category</TableHead>
            <TableHead className="px-6">Slug</TableHead>
            <TableHead className="px-6 w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {subcategories.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="h-24 text-center text-sm text-muted-foreground"
              >
                No subcategories found.
              </TableCell>
            </TableRow>
          ) : (
            subcategories.map((subcategory) => (
              <TableRow key={subcategory.id}>
                <TableCell className="px-6 font-medium">
                  {subcategory.name}
                </TableCell>

                <TableCell className="px-6">
                  {subcategory.category.name}
                </TableCell>

                <TableCell className="px-6 text-muted-foreground">
                  {subcategory.slug}
                </TableCell>

                <TableCell className="px-6">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      title="Edit subcategory"
                    >
                      <Pencil className="size-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-destructive hover:text-destructive"
                      title="Delete subcategory"
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
        <AddSubcategoryButton />
      </div>
    </div>
  );
};

export default SubcategoryTable;
