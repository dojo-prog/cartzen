import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Header = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your store products and inventory.
        </p>
      </div>

      <Button size={"lg"}>
        <Plus className="mr-2 size-4" />
        Add Product
      </Button>
    </div>
  );
};

export default Header;
