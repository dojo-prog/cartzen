import CategorySection from "./categories/CategorySection";
import SubcategorySection from "./categories/SubcategorySection";

const AdminCategoriesPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage product categories and subcategories.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <CategorySection />
        <SubcategorySection />
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
