import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Image from "next/image";

import { updateCart } from "@/app/actions";
import { auth } from "@/auth";
import QuantitySection from "@/components/landing/products/QuantitySection";
import { getCartItems, getUserByEmail } from "@/database/queries";
import convertNumberToBN from "@/utils/bn-number-utils";
import { getDiscountPrice } from "@/utils/discount-price-utils";

import { MdDelete } from "react-icons/md";
import ToggleCartItemButton from "@/components/landing/products/cart/ToggleCartItemButton";
import Link from "next/link";

import { IoIosArrowDroprightCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { ToastMessage } from "@/utils/toast";
import CartProductCard from "@/components/landing/products/cart/CartProductCard";
import CartOrderSummary from "@/components/landing/products/cart/CartOrderSummary";

export const metadata = {
  title: "Cart | LWSKart",
  description:
    "LWSKart is an app that shows various products with various categories. Buy your desired products",
  openGraph: {
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=Cart | LWSKart`],
  },
};

const CartPage = async ({
  params: { lang },
  searchParams: { productId, quantity },
}) => {
  const session = await auth();
  if (!session) {
    redirect(`/${lang}/login`);
  }

  const user = await getUserByEmail(session?.user?.email);

  let cartItems = await getCartItems(user?.id);
  let added;

  if (productId) {
    added = await updateCart(user?.id, productId, quantity ?? 1);
    redirect(`/${lang}/cart/`);
  }

  return (
    <div className="container pb-20">
      <div className="grid grid-cols-1 gap-5">
        <div className="bg-gray-200 py-2 rounded-md">
          <div className="grid grid-cols-12 text-center">
            <h3 className="col-span-5 font-medium">Product</h3>
            <h3 className="col-span-3 font-medium">Quantity</h3>
            <h3 className="col-span-3 font-medium">Total Price</h3>
            <div className="col-span-1"></div>
          </div>
        </div>

        {cartItems?.length > 0 ? (
          cartItems.map((item) => (
            <CartProductCard
              item={item}
              key={item?.id}
              lang={lang}
              user={user}
              added={added}
            />
          ))
        ) : (
          <div className="flex flex-col items-center text-center p-10 justify-center align-middle bg-slate-100 rounded-md">
            <p className="text-rose-500 text-3xl">You have no item in cart.</p>
          </div>
        )}
      </div>
      <CartOrderSummary cartItemsFromDB={cartItems} lang={lang} />
    </div>
  );
};

export default CartPage;
