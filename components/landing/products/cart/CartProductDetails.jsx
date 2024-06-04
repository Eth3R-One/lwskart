"use client";
import Image from "next/image";
import Link from "next/link";
import QuantitySection from "../QuantitySection";
import { MdDelete } from "react-icons/md";
import ToggleCartItemButton from "./ToggleCartItemButton";
import { getDiscountPrice } from "@/utils/discount-price-utils";
import convertNumberToBN from "@/utils/bn-number-utils";
import useOrderStatus from "@/hooks/useOrderStatus";
import useWishlist from "@/hooks/useWishlist";
import { useEffect } from "react";
import useCartItems from "@/hooks/useCartItems";
const CartProductDetails = ({ product, item, lang, session }) => {
  const { orderStatus, setOrderStatus } = useOrderStatus();

  return (
    <div
      className={` rounded-md shadow-lg border-2 p-4 grid grid-cols-12 items-center ${
        product?.quantity < 1 || product?.quantity < item?.quantity
          ? "border-red-300"
          : "border-gray-300"
      }`}
    >
      <div className="col-span-5 flex items-center">
        <Link href={`/${lang}/shop/${item?.id}`}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={100}
            height={100}
            className="object-contain h-24 w-24 hover:scale-110 cursor-pointer"
          />
        </Link>
        <div className="ml-4">
          <h5 className="font-medium uppercase cursor-pointer">
            <Link href={`/${lang}/shop/${product?.id}`}>{product.title}</Link>
          </h5>
          <div className="gap-2">
            <span className="text-xs pr-5">(STOCK: {product?.quantity})</span>

            {product?.quantity > 0 ? (
              <p className="text-sm text-green-700">Available</p>
            ) : (
              <p className="text-sm text-red-700">
                Not Available. (Remove it from the cart)
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <p className="text-primary font-medium text-xl">
              $
              {lang === "en"
                ? Math?.round(
                    getDiscountPrice(
                      product?.price,
                      product?.discountPercentage
                    )
                  )
                : convertNumberToBN(
                    Math?.round(
                      getDiscountPrice(
                        product?.price,
                        product?.discountPercentage
                      )
                    )
                  )}
            </p>
            {product?.discountPercentage > 0 && (
              <p className="text-base text-gray-400 line-through">
                $
                {lang == "en"
                  ? Math?.round(item.price)
                  : convertNumberToBN(Math.round(item.price))}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="col-span-3 gap-y-2 flex flex-col items-center justify-center">
        <QuantitySection userId={session?.user?.id} productId={item.id} />
        {item?.quantity > product?.quantity && (
          <p className="px-3 text-xs rounded-md bg-yellow-400 border border-red-400 text-black">
            quantity greater than stock
          </p>
        )}
      </div>

      <div className="col-span-3 flex justify-center items-center">
        <p className="text-2xl text-primary">
          $
          {lang === "en"
            ? Math.round(
                getDiscountPrice(product?.price, product?.discountPercentage) *
                  item?.quantity
              )
            : convertNumberToBN(
                Math.round(
                  getDiscountPrice(product.price, product?.discountPercentage) *
                    item?.quantity
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
  );
};

export default CartProductDetails;
