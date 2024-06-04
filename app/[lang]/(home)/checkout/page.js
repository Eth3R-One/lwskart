import { auth } from "@/auth";

import CheckOutPageComponent from "@/components/landing/products/checkout/CheckOutPageComponent";
import {
  getCartItems,
  getUserAddress,
  getUserByEmail,
  getUserById,
} from "@/database/queries";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Checkout | LWSKart",
  description:
    "LWSKart is an app that shows various products with various categories. Buy your desired products",
  openGraph: {
    images: [
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=Checkout | LWSKart`,
    ],
  },
};

const CheckoutPage = async ({ params: { lang } }) => {
  const session = await auth();
  if (!session) {
    redirect(`/${lang}/login`);
  }

  const user = await getUserByEmail(session?.user?.email);

  const address = await getUserAddress(user?.id);
  const cartItems = await getCartItems(user?.id);
  if (!cartItems || cartItems?.length == 0) {
    redirect(`/${lang}/shop`);
  }

  return <CheckOutPageComponent lang={lang} user={user} address={address} />;
};

export default CheckoutPage;
