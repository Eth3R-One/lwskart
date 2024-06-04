import { auth } from "@/auth";

import CheckOutPageComponent from "@/components/landing/products/checkout/CheckOutPageComponent";
import { getCartItems, getUserAddress, getUserById } from "@/database/queries";
import { redirect } from "next/navigation";

const CheckoutPage = async ({ params: { lang } }) => {
  const session = await auth();
  if (!session) {
    redirect(`/${lang}/login`);
  }

  const user = await getUserById(session?.user?.id);
  const address = await getUserAddress(session?.user?.id);
  const cartItems = await getCartItems(session?.user?.id);
  if (!cartItems || cartItems?.length == 0) {
    redirect(`/${lang}/shop`);
  }

  return <CheckOutPageComponent lang={lang} user={user} address={address} />;
};

export default CheckoutPage;
