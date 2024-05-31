import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Image from "next/image";

import { updateCart } from "@/app/actions";
import { auth } from "@/auth";
import QuantitySection from "@/components/landing/products/QuantitySection";
import { getCartItems } from "@/database/queries";
import convertNumberToBN from "@/utils/bn-number-utils";
import { getDiscountPrice } from "@/utils/discount-price-utils";

import { MdDelete } from "react-icons/md";
import ToggleCartItemButton from "@/components/landing/products/cart/ToggleCartItemButton";
import Link from "next/link";

import { IoIosArrowDroprightCircle } from "react-icons/io";

const CartPage = async ({
  params: { lang },
  searchParams: { productId, quantity },
}) => {
  const session = await auth();
  if (!session) {
    redirect(`/${lang}/login`);
  }

  const cartItems = await getCartItems(session?.user?.id);
  if (productId) {
    const response = await updateCart(
      session?.user?.id,
      productId,
      quantity ?? 1
    );
    if (response?.status === 201) {
      revalidatePath("/", "layout");
    }
  }
  const calculateTotal = (cartItems) => {
    return Math.round(
      cartItems.reduce((total, item) => {
        const discountedPrice =
          item.price * (1 - item.discountPercentage / 100);
        return total + discountedPrice * item.quantity;
      }, 0)
    );
  };

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
            <div
              key={item.id}
              className="border-gray-300 rounded-md shadow-lg border-2 p-4 grid grid-cols-12 items-center"
            >
              <div className="col-span-5 flex items-center">
                <Link href={`/${lang}/shop/${item?.id}`}>
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="object-contain h-24 w-24 hover:scale-110 cursor-pointer"
                  />
                </Link>
                <div className="ml-4">
                  <h5 className="font-medium uppercase cursor-pointer">
                    <Link href={`/${lang}/shop/${item?.id}`}>{item.title}</Link>
                  </h5>
                  <div className="flex items-center gap-2">
                    <p className="text-primary font-medium text-xl">
                      $
                      {lang === "en"
                        ? Math.round(
                            getDiscountPrice(
                              item.price,
                              item.discountPercentage
                            )
                          )
                        : convertNumberToBN(
                            Math.round(
                              getDiscountPrice(
                                item.price,
                                item.discountPercentage
                              )
                            )
                          )}
                    </p>
                    {item.discountPercentage > 0 && (
                      <p className="text-base text-gray-400 line-through">
                        $
                        {lang === "en"
                          ? Math.round(item.price)
                          : convertNumberToBN(Math.round(item.price))}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-span-3 flex justify-center">
                <QuantitySection
                  userId={session?.user?.id}
                  productId={item.id}
                />
              </div>

              <div className="col-span-3 flex justify-center items-center">
                <p className="text-2xl text-primary">
                  $
                  {lang === "en"
                    ? Math.round(
                        getDiscountPrice(item.price, item?.discountPercentage) *
                          item?.quantity
                      )
                    : convertNumberToBN(
                        Math.round(
                          getDiscountPrice(
                            item.price,
                            item?.discountPercentage
                          ) * item?.quantity
                        )
                      )}
                </p>
              </div>

              <div className="col-span-1 flex justify-center items-center">
                <div className="text-gray-600 cursor-pointer hover:text-primary">
                  <ToggleCartItemButton
                    userId={session?.user?.id}
                    productId={item?.id}
                    className={"hover:scale-110"}
                  >
                    <MdDelete size={24} />
                  </ToggleCartItemButton>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center text-center p-10 justify-center align-middle bg-slate-100 rounded-md">
            <p className="text-rose-500 text-3xl">You have no item in cart.</p>
          </div>
        )}
      </div>

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
                  <div className="flex justify-center gap-5 border-t border-gray-200 pt-6 text-gray-900">
                    <dt className="text-base">Total</dt>
                    <dd className="text-base">
                      $
                      {lang == "en"
                        ? calculateTotal(cartItems)
                        : convertNumberToBN(calculateTotal(cartItems))}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mx-auto w-full max-w-lg">
                <Link
                  href={`/${lang}/checkout`}
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 gap-2 hover:scale-110"
                >
                  <span>Checkout</span>
                  <IoIosArrowDroprightCircle size={20} />
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
