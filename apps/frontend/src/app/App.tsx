import NotFound from "@/components/feedback/NotFound";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import AdminLayout from "@/layouts/AdminLayout";
import StoreLayout from "@/layouts/StoreLayout";
import LoginPage from "@/pages/auth/public/LoginPage";
import SignupPage from "@/pages/auth/public/SignupPage";
import CartPage from "@/pages/public/CartPage";
import CheckoutPage from "@/pages/public/CheckoutPage";
import ContactUsPage from "@/pages/public/ContactUsPage";
import HomePage from "@/pages/public/HomePage";
import OrderDetailsPage from "@/pages/public/OrderDetailsPage";
import OrdersPage from "@/pages/public/OrdersPage";
import PaymentsPage from "@/pages/public/PaymentsPage";
import ProductDetailsPage from "@/pages/public/ProductDetailsPage";
import ProductsPage from "@/pages/public/ProductsPage";
import SubcategoryPage from "@/pages/public/SubcategoryPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

const App = () => {
  const { data: user } = useCurrentUser();

  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/" element={<StoreLayout />}>
          <Route index element={<HomePage />} />

          <Route path="contact-us" element={<ContactUsPage />} />

          <Route
            path="categories/:categoryId/subcategories/:subcategoryId"
            element={<SubcategoryPage />}
          />

          <Route path="products" element={<ProductsPage />} />

          <Route path="products/:productId" element={<ProductDetailsPage />} />

          <Route path="cart" element={<CartPage />} />

          <Route
            path="checkout"
            element={user ? <CheckoutPage /> : <Navigate to={"/"} />}
          />

          <Route
            path="payments"
            element={user ? <PaymentsPage /> : <Navigate to={"/"} />}
          />

          <Route path="orders" element={<OrdersPage />} />
          <Route path="/orders/:orderId" element={<OrderDetailsPage />} />

          <Route path="payments/:orderId" element={<PaymentsPage />} />
        </Route>

        {/* Auth */}
        <Route path="/auth" element={user && <Navigate to={"/"} />}>
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        {/* Admin */}
        <Route
          path="/admin"
          element={
            user && user.role === "admin" ? (
              <AdminLayout />
            ) : (
              <Navigate to={"/"} />
            )
          }
        >
          {/* Admin routes */}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster position="top-right" />
    </>
  );
};

export default App;
