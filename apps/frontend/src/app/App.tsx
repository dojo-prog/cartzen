import AdminLayout from "@/layouts/AdminLayout";
import StoreLayout from "@/layouts/StoreLayout";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import CartPage from "@/pages/public/CartPage";
import HomePage from "@/pages/public/HomePage";
import OrdersPage from "@/pages/public/OrdersPage";
import PaymentsPage from "@/pages/public/PaymentsPage";
import ProductDetailsPage from "@/pages/public/ProductDetailsPage";
import ProductsPage from "@/pages/public/ProductsPage";
import SubcategoryPage from "@/pages/public/SubcategoryPage";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/" element={<StoreLayout />}>
          <Route index element={<HomePage />} />

          <Route
            path="categories/:categoryId/subcategories/:subcategoryId"
            element={<SubcategoryPage />}
          />

          <Route path="products" element={<ProductsPage />} />

          <Route path="products/:productId" element={<ProductDetailsPage />} />

          <Route path="cart" element={<CartPage />} />

          <Route path="orders" element={<OrdersPage />} />

          <Route path="payments/:orderId" element={<PaymentsPage />} />
        </Route>

        {/* Auth */}
        <Route path="/auth">
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Admin routes */}
        </Route>
      </Routes>

      <Toaster position="top-right" />
    </>
  );
};

export default App;
