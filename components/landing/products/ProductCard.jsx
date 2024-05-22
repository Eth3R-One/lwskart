import Image from "next/image";

import CustomLink from "@/components/CustomLink";

import convertNumberToBN from "@/utils/bn-number-utils";
import { getDiscountPrice } from "@/utils/discount-price-utils";

import { FaStar } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

const ProductCard = ({ product, lang }) => {
  return (
    <div className="bg-white shadow rounded overflow-hidden group">
      <div className="relative">
        <Image
          height={1080}
          width={720}
          src={product?.thumbnail}
          alt={product?.title}
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
          <a
            href="#"
            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            title="add to wishlist"
          >
            <FaHeart />
          </a>
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
          {product?.discountPercentage && (
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
      <a
        href="#"
        className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
      >
        Add to cart
      </a>
    </div>
  );
};

export default ProductCard;
