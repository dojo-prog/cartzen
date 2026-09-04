export const formatPrice = (priceCents: number, currency = "PHP") => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  }).format(priceCents / 100);
};
