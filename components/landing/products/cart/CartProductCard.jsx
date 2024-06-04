import { getProductById } from "@/database/queries";
import CartProductDetails from "./CartProductDetails";

const CartProductCard = async ({ item, lang, user, added }) => {
  const product = await getProductById(item?.productId);

  return (
    <CartProductDetails product={product} item={item} lang={lang} user={user} />
  );
};

export default CartProductCard;
