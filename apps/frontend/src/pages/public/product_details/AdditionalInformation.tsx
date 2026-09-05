import ProductInfo from "./ProductInfo";
import type { ProductWithRelations } from "@cartzen/shared";

type Props = {
  product: ProductWithRelations;
  isOutOfStock: boolean;
};

const AdditionalInformation = ({ product, isOutOfStock }: Props) => {
  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="text-xl font-semibold">Product Information</h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ProductInfo label="Category" value={product.category.name} />

        <ProductInfo label="Subcategory" value={product.subcategory.name} />

        <ProductInfo
          label="Weight"
          value={`${product.weight_grams.toLocaleString()} g`}
        />

        <ProductInfo
          label="Availability"
          value={
            isOutOfStock
              ? "Out of stock"
              : `${product.stock_quantity} available`
          }
        />
      </div>
    </section>
  );
};

export default AdditionalInformation;
