
export const cleanProducts = (products) =>
  products.filter(
    (p) => p.name && p.price && p.price !== "N/A" && p.price !== null
  );

export const extractRating = (r) => {
  if (!r) return 0;
  const match = r.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};


