export const formatPrice = (priceCents: number, currency: string) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  }).format(priceCents / 100);
};
