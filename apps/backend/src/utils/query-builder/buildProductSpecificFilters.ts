import { ProductQuery } from "@cartzen/shared";

interface BuildProductSpecificFiltersResult {
  whereClause: string;
  orderByClause: string;
  limitClause: string;
  offsetClause: string;
  values: unknown[];
}

interface Params {
  filters: ProductQuery;
  searchColumns?: string[];
  baseCondition?: string[];
  baseValues?: unknown[];
}

const buildProductSpecificFilters = ({
  filters,
  searchColumns = [],
  baseCondition = [],
  baseValues = [],
}: Params): BuildProductSpecificFiltersResult => {
  const {
    category,
    minPrice,
    maxPrice,
    inStock,
    featured,
    page,
    limit,
    sort,
    search,
  } = filters;

  const conditions: string[] = [...baseCondition];
  const values: unknown[] = [...baseValues];

  let whereClause = "";
  let orderByClause = "";
  let limitClause = "";
  let offsetClause = "";

  // =======================================
  // WHERE CLAUSE
  // =======================================

  if (search && searchColumns.length) {
    values.push(`%${search}%`);
    const searchConditions = searchColumns
      .map((sc) => `${sc} ILIKE $${values.length}`)
      .join(" AND ");
    conditions.push(searchConditions);
  }

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
    conditions.push("p.is_featured = true");
  }

  if (conditions.length > 0) {
    whereClause = `WHERE ${conditions.join(" AND ")}`;
  }

  // =======================================
  // ORDER BY CLAUSE
  // =======================================

  const sortMap: Record<string, [string, "ASC" | "DESC"]> = {
    newest: ["p.created_at", "DESC"],
    oldest: ["p.created_at", "ASC"],
    price_asc: ["p.price_cents", "ASC"],
    price_desc: ["p.price_cents", "DESC"],
  };

  if (sort && sortMap[sort]) {
    const [key, order] = sortMap[sort];

    orderByClause = `ORDER BY ${key} IS NULL, ${key} ${order}`;
  }

  // =======================================
  // LIMIT & OFFSET CLAUSE
  // =======================================

  if (page && limit) {
    const offset = (page - 1) * limit;

    limitClause = `LIMIT ${limit}`;
    offsetClause = `OFFSET ${offset}`;
  }

  return {
    whereClause,
    orderByClause,
    limitClause,
    offsetClause,
    values,
  };
};

export default buildProductSpecificFilters;
