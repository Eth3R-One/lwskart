"use client";
import CustomLink from "@/components/CustomLink";
import useCartItems from "@/hooks/useCartItems";
import useOrderStatus from "@/hooks/useOrderStatus";
import convertNumberToBN from "@/utils/bn-number-utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { toast } from "react-toastify";

const CartOrderSummary = ({ cartItemsFromDB, lang }) => {
  const { orderStatus, setOrderStatus } = useOrderStatus();
  const { cartItems, setCartItems } = useCartItems();

  const [isOkay, setIsOkay] = useState(true);

  const calculateTotal = (cartItemsFromDB) => {
    return Math.round(
      cartItemsFromDB?.reduce((total, item) => {
        const discountedPrice =
          item.price * (1 - item.discountPercentage / 100);
        return total + discountedPrice * item.quantity;
      }, 0)
    );
  };

  useEffect(() => {
    if (cartItems && cartItemsFromDB) {
      let stat = true;
      for (let i = 0; i < cartItems.length; i++) {
        const cartItem = cartItems[i];
        const cartItemFromDB = cartItemsFromDB.find(
          (item) => item.productId == cartItem.productId
        );

        if (
          cartItem?.quantity > cartItemFromDB?.product?.quantity ||
          cartItemFromDB?.product?.quantity === 0
        ) {
          setOrderStatus((prevStatus) => ({
            ...prevStatus,
            quantityError: true,
          }));
          stat = false;
          break;
        }
      }
      setIsOkay(stat);
    }
  }, [cartItems, cartItemsFromDB]);

  return (
    <div className="grid grid-cols-1 gap-10 pt-10">
      <div className="bg-white">
        <main className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 sm:pb-24 sm:pt-8 lg:px-8 xl:px-2 xl:pt-14">
          <h1 className="sr-only">Checkout</h1>

          <div className="mx-auto grid max-w-lg grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-1 border border-gray-300 rounded-lg ">
            <div className="mx-auto w-full max-w-lg">
              <h2 className="items-center text-center text-3xl py-2">
                Order summary
              </h2>

              <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
                <div className="flex justify-center items-center gap-5 border-t border-gray-200 pt-6 text-gray-900">
                  <dt className="text-xl">Total</dt>
                  <dd className="text-2xl">
                    ${" "}
                    {lang == "en"
                      ? calculateTotal(cartItemsFromDB)
                      : convertNumberToBN(calculateTotal(cartItemsFromDB))}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mx-auto max-w-lg pb-5">
              {cartItems?.length > 0 &&
              cartItemsFromDB?.length > 0 &&
              isOkay ? (
                <Link
                  href={`/${lang}/checkout`}
                  className="flex items-center px-5 justify-center rounded-md border border-green-500 py-2 text-green-500 hover:bg-green-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 gap-2 hover:scale-110"
                >
                  <span>Checkout</span>
                  <IoIosArrowDroprightCircle size={20} />
                </Link>
              ) : cartItemsFromDB?.length != 0 || cartItems?.length != 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    toast.error("Please adjust the quantity and products");
                  }}
                  className="flex items-center px-5 justify-center rounded-md border border-red-500 py-2 text-red-500 hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2 gap-2 hover:scale-110 cursor-not-allowed"
                >
                  <span>Checkout</span>
                  <IoIosArrowDroprightCircle size={20} />
                </button>
              ) : (
                <CustomLink
                  href={"shop/"}
                  className="flex items-center px-5 justify-center rounded-md border hover:border-green-500 py-2 hover:text-green-500 bg-green-400 text-white hover:bg-white focus:outline-none focus:ring-2 focus:green-red-900 focus:ring-offset-2 gap-2 hover:scale-110 "
                >
                  Go To shop
                </CustomLink>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CartOrderSummary;
