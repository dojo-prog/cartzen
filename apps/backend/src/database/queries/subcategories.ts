export const SUBCATEGORY_RELATIONS_PROJECTION = `
  sc.id,
  sc.name,
  sc.slug,
  sc.created_at,
  
  jsonb_build_object(
    'id', c.id, 
    'name', c.name
  ) AS category
`;

export const SUBCATEGORY_JOINS = `
  JOIN categories c
    ON c.id = sc.category_id
`;
