import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CartItem from "@/features/carts/component/CartItem";
import type { CartItemWithRelations } from "@cartzen/shared";

type Props = {
  cartItems: CartItemWithRelations[];
};

const CartItemList = ({ cartItems }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cart Items ({cartItems?.length})</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {cartItems?.map((item, index) => (
          <>
            <CartItem item={item} />
            {index < cartItems.length - 1 && <Separator />}
          </>
        ))}
      </CardContent>
    </Card>
  );
};

export default CartItemList;
