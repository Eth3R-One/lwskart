import Image from "next/image";

import CustomLink from "@/components/CustomLink";

import convertNumberToBN from "@/utils/bn-number-utils";
import { getDiscountPrice } from "@/utils/discount-price-utils";

import { FaStar } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import AddToWishListButton from "./cart/ToggleWishListButton";
import { auth } from "@/auth";
import { getUserByEmail } from "@/database/queries";
import ToggleCartItemButton from "./cart/ToggleCartItemButton";

const ProductCard = async ({ product, lang }) => {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);

  return (
    <div className="bg-white shadow rounded group">
      <div className="relative">
        <Image
          height={0}
          width={0}
          src={product?.thumbnail}
          alt={product?.title}
          sizes="100vw"
          className="w-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
          {/* view/add to cart */}
          <CustomLink
            href={`/shop/${product?.id}`}
            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            title="view product"
          >
            <FaMagnifyingGlass />
          </CustomLink>

          <AddToWishListButton userId={user?.id} productId={product?.id} />
        </div>
      </div>
      <div className="pt-4 pb-3 px-4">
        <CustomLink href={`shop/${product?.id}/`}>
          <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
            {product?.title}
          </h4>
        </CustomLink>
        <div className="flex items-baseline mb-1 space-x-2">
          <p className="text-xl text-primary font-semibold">
            $
            {lang == "en"
              ? Math.round(
                  getDiscountPrice(product?.price, product?.discountPercentage)
                )
              : convertNumberToBN(
                  Math.round(
                    getDiscountPrice(
                      product?.price,
                      product?.discountPercentage
                    )
                  )
                )}
          </p>
          {product?.discountPercentage > 0 && (
            <p className="text-sm text-gray-400 line-through">
              $
              {lang == "en"
                ? Math.round(product?.price)
                : convertNumberToBN(Math.round(product?.price))}
            </p>
          )}
        </div>
        <div className="flex items-center">
          <div className="flex gap-1 text-sm text-yellow-400">
            <span>
              <FaStar />
            </span>
          </div>
          <div className="text-xs text-gray-500 ml-3">
            (
            {lang == "en"
              ? `${product?.feedBack?.reviews}`
              : convertNumberToBN(product?.feedBack?.reviews)}
            )
          </div>
        </div>
      </div>
      {product?.quantity ? (
        <ToggleCartItemButton
          productId={product?.id}
          userId={user?.id}
          className="block w-full bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase gap-2 hover:bg-transparent hover:text-primary transition"
        />
      ) : (
        <button
          disabled
          className="block w-full cursor-not-allowed py-1 text-center text-white rounded-b bg-red-400 border border-red-400 rounded transition uppercase font-roboto font-medium"
        >
          Stock Out
        </button>
      )}
    </div>
  );
};

export default ProductCard;
