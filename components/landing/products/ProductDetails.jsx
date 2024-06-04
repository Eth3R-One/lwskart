import convertNumberToBN from "@/utils/bn-number-utils";
import ImageList from "./ImageList";
import Star from "./Star";
import { getDiscountPrice } from "@/utils/discount-price-utils";

import { FaShoppingBag } from "react-icons/fa";
import { LiaHeartSolid } from "react-icons/lia";
import CustomLink from "@/components/CustomLink";
import ToggleWishListButton from "./cart/ToggleWishListButton";
import { auth } from "@/auth";
import ToggleCartItemButton from "./cart/ToggleCartItemButton";
import QuantitySection from "./QuantitySection";
import { FaCartShopping } from "react-icons/fa6";
import SocialShare from "../SocialShare";
import { getUserByEmail } from "@/database/queries";

const ProductDetails = async ({ product, lang }) => {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);
  return (
    <>
      <div className="container grid grid-cols-2 gap-6 ">
        <ImageList title={product?.title} images={product?.images} />

        <div>
          <h2 className="text-3xl font-medium uppercase mb-2">
            {product?.title}
          </h2>
          <div className="flex items-center mb-4">
            <Star rating={product?.feedBack?.rating} />
            <div className="text-xs text-gray-500 ml-3">
              (
              {lang == "en"
                ? product?.feedBack?.reviews
                : convertNumberToBN(product?.feedBack?.reviews)}{" "}
              Reviews)
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-800 font-semibold space-x-2">
              <span>Availability: </span>
              {product?.quantity >= 20 && (
                <span className="text-green-600">In Stock</span>
              )}
              {0 < product?.quantity && product?.quantity < 20 && (
                <span className="text-yellow-600">Limited Stock</span>
              )}
              {product?.quantity == 0 && (
                <span className="text-red-600">Stock Out</span>
              )}
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Brand: </span>
              <span className="text-gray-600">{product?.brand}</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Category: </span>
              <CustomLink
                href={`shop`}
                searchParams={{ category: product?.category }}
                className="text-gray-600 underline hover:text-primary"
              >
                {product?.category}
              </CustomLink>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">SKU: </span>
              <span className="text-gray-600">{product?.sku}</span>
            </p>
          </div>
          <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
            <p className="text-xl text-primary font-semibold">
              $
              {lang == "en"
                ? Math.round(
                    getDiscountPrice(
                      product?.price,
                      product?.discountPercentage
                    )
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
              <p className="text-base text-gray-400 line-through">
                $
                {lang == "en"
                  ? Math.round(product?.price)
                  : convertNumberToBN(Math.round(product?.price))}
              </p>
            )}
          </div>

          <p className="mt-4 text-gray-600">
            {product?.description?.slice(0, 50)}
          </p>

          {product?.stock?.quantity > 0 && (
            <div className="mt-4">
              <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
              <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                  -
                </div>
                <div className="h-8 w-8 text-base flex items-center justify-center">
                  4
                </div>
                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                  +
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 items-center">
            <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
            <QuantitySection userId={user?.id} productId={product?.id} />
          </div>
          <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
            {product?.quantity > 0 ? (
              <ToggleCartItemButton
                productId={product?.id}
                userId={user?.id}
                className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
              />
            ) : (
              <div className="flex flex-row items-center cursor-not-allowed px-6 py-2 text-center text-sm text-white bg-red-400 border border-red-400 rounded transition uppercase font-roboto font-medium gap-2">
                <FaCartShopping /> Add to cart
              </div>
            )}
            <ToggleWishListButton
              productId={product?.id}
              userId={user?.id}
              className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
            >
              Add to Wishlist || Remove
            </ToggleWishListButton>
          </div>

          <div className="flex gap-3 mt-4">
            <SocialShare />
          </div>
        </div>
      </div>
      <div className="container pb-16">
        <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
          Product details
        </h3>
        <div className="w-3/5 pt-6">
          <div className="text-gray-600">{product?.description}</div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
