import pool from "../database/db";
import {
  Subcategory,
  SubcategoryQuery,
  SubcategoryWithRelations,
} from "@cartzen/shared";
import buildFilterQueries from "../utils/query-builder/buildFilterQueries";
import buildInsertQueries from "../utils/query-builder/buildInsertQueries";
import buildUpdateQueries from "../utils/query-builder/buildUpdateQueries";
import {
  SUBCATEGORY_JOINS,
  SUBCATEGORY_RELATIONS_PROJECTION,
} from "../database/queries/subcategories";

export const find = async (
  filters: SubcategoryQuery,
): Promise<{ subcategories: SubcategoryWithRelations[]; total: number }> => {
  const { whereClause, offsetClause, limitClause, values } = buildFilterQueries(
    filters,
    [],
    [],
    ["sc.name"],
  );

  const { rows } = await pool.query(
    `
    SELECT ${SUBCATEGORY_RELATIONS_PROJECTION}, 
      COUNT(*) OVER()::INT AS total
    FROM subcategories sc
    ${SUBCATEGORY_JOINS}
    ${whereClause}
    ORDER BY name ASC
    ${limitClause}
    ${offsetClause}
    `,
    values,
  );

  const subcategories = rows.map(({ total, ...subcategory }) => subcategory);

  return {
    subcategories,
    total: rows[0]?.total ?? 0,
  };
};

export const findByCategory = async (
  categoryId: string,
  filters: SubcategoryQuery,
): Promise<{ subcategories: Subcategory[]; total: number }> => {
  const { whereClause, orderByClause, offsetClause, limitClause, values } =
    buildFilterQueries(filters, ["category_id = $1"], [categoryId], ["name"]);

  const { rows } = await pool.query(
    `
    SELECT *,
      COUNT(*) OVER()::INT AS total
    FROM subcategories 
    ${whereClause}
    ${orderByClause}
    ${limitClause}
    ${offsetClause}
    `,
    values,
  );

  const subcategories = rows.map(({ total, ...subcategory }) => subcategory);

  return {
    subcategories,
    total: rows[0]?.total ?? 0,
  };
};

export const findAll = async (): Promise<Partial<Subcategory>[]> => {
  const { rows } = await pool.query(
    `
    SELECT id, name, slug
    FROM subcategories 
    ORDER BY name ASC
    `,
  );

  return rows;
};

export const findById = async (subcategoryId: string): Promise<Subcategory> => {
  const { rows } = await pool.query(
    `
    SELECT * FROM subcategories
    WHERE id = $1
    `,
    [subcategoryId],
  );

  return rows[0];
};

export const findWithRelationsById = async (
  subcategoryId: string,
): Promise<SubcategoryWithRelations> => {
  const { rows } = await pool.query(
    `
    SELECT ${SUBCATEGORY_RELATIONS_PROJECTION}
    FROM subcategories sc
    ${SUBCATEGORY_JOINS}
    WHERE sc.id = $1
    `,
    [subcategoryId],
  );

  return rows[0];
};

export const findByName = async (
  categoryId: string,
  name: string,
): Promise<Subcategory> => {
  const { rows } = await pool.query(
    `
    SELECT * FROM subcategories
    WHERE LOWER(name) = LOWER($1)
      AND category_id = $2
    `,
    [name, categoryId],
  );

  return rows[0];
};

export const findBySlug = async (
  categorySlug: string,
  subcategorySlug: string,
): Promise<Subcategory> => {
  const { rows } = await pool.query(
    `
    SELECT sc.* 
    FROM subcategories sc
    JOIN categories c
      ON c.id = sc.category_id 
    WHERE sc.slug = $1
      AND c.slug = $2
    `,
    [subcategorySlug, categorySlug],
  );

  return rows[0];
};

export const add = async (payload: {
  category_id: string;
  name: string;
  slug: string;
}): Promise<SubcategoryWithRelations> => {
  const { columnsStr, placeholdersStr, values } = buildInsertQueries(payload);

  const { rows } = await pool.query(
    `
    INSERT INTO subcategories (${columnsStr})
    VALUES (${placeholdersStr})
    RETURNING id
    `,
    values,
  );

  const id = rows[0].id;

  return findWithRelationsById(id);
};

export const update = async (
  categoryId: string,
  subcategoryId: string,
  changes: Partial<Subcategory>,
): Promise<SubcategoryWithRelations> => {
  const { setClause, values } = buildUpdateQueries(changes);

  values.push(subcategoryId, categoryId);

  await pool.query(
    `
    UPDATE subcategories
    ${setClause}
    WHERE id = $${values.length - 1}
      AND category_id = $${values.length}
    `,
    values,
  );

  return findWithRelationsById(subcategoryId);
};

export const remove = async (subcategoryId: string): Promise<void> => {
  await pool.query(
    `
    DELETE FROM subcategories
    WHERE id = $1
    `,
    [subcategoryId],
  );
};
