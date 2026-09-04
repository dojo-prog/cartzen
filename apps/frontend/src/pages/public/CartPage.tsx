import Summary from "./carts/Summary";
import CartItemList from "./carts/CartItemList";
import EmptyCart from "./carts/EmptyCart";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import RequireAuth from "@/components/feedback/RequireAuth";
import { useAllCartItems } from "@/features/carts/hooks/useAllCartItems";

const CartPage = () => {
  const { data: cartItems } = useAllCartItems();
  const { data: user, isLoading: isUserLoading } = useCurrentUser();

  const subtotal = cartItems?.reduce(
    (total, item) => total + (item.product.price_cents / 100) * item.quantity,
    0,
  );

  return (
    <div className="container mx-auto space-y-8 py-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <p className="text-muted-foreground">
          Review your items before checkout.
        </p>
      </div>

      {isUserLoading ? null : !user ? (
        <RequireAuth />
      ) : cartItems?.length === 0 ? (
        <EmptyCart />
      ) : (
        cartItems && (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <CartItemList cartItems={cartItems} />
            <Summary subtotal={subtotal ?? 0} />
          </div>
        )
      )}
    </div>
  );
};

export default CartPage;
