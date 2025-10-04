export const formatPrice = (price: number) => {
  if (!price) return "N/A";
  return price.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });
};

export const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  const date = new Date(parseInt(dateString));
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
