export const getDiscountPrice = (listedPrice, discount) => {
  const price = listedPrice * ((100 - discount) / 100);
  return price.toFixed(2);
};
