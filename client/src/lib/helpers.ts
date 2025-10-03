export const formatPrice = (price: number) => {
  if (!price) return "N/A";
  return price.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });
};
