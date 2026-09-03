import { ProductSpecificQuery } from "@cartzen/shared";

interface BuildProductSpecificFiltersResult {
  conditions: string[];
  values: unknown[];
}

const buildProductSpecificFilters = (
  specificFilters: ProductSpecificQuery,
): BuildProductSpecificFiltersResult => {
  const { category, minPrice, maxPrice, inStock, featured } = specificFilters;

  const conditions: string[] = [];
  const values: unknown[] = [];

  if (category) {
    values.push(category);
    conditions.push(`c.slug = $${values.length}`);
  }

  if (!Number.isNaN(minPrice) && minPrice !== undefined) {
    values.push(minPrice * 100);
    conditions.push(`p.price_cents >= $${values.length}`);
  }

  if (!Number.isNaN(maxPrice) && maxPrice !== undefined) {
    values.push(maxPrice * 100);
    conditions.push(`p.price_cents <= $${values.length}`);
  }

  if (inStock) {
    conditions.push(`i.quantity > 0`);
  }

  if (featured) {
    conditions.push("p.isFeatured = true");
  }

  return {
    conditions,
    values,
  };
};

export default buildProductSpecificFilters;
