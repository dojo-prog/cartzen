import { Card } from "@/components/ui/card";
import Header from "./products/Header";
import StatusCards from "./products/StatusCards";
import ProductTable from "./products/ProductTable";
import ProductTableHeader from "./products/ProductTableHeader";

const AdminProductsPage = () => {
  return (
    <div className="space-y-6">
      <Header />

      <StatusCards />

      {/* Products */}
      <Card>
        <ProductTableHeader />
        <ProductTable />
      </Card>
    </div>
  );
};

export default AdminProductsPage;
