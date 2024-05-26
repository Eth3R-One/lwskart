import convertNumberToBN from "@/utils/bn-number-utils";
import ImageList from "./ImageList";
import Star from "./Star";
import { getDiscountPrice } from "@/utils/discount-price-utils";

import { FaShoppingBag } from "react-icons/fa";
import { LiaHeartSolid } from "react-icons/lia";
import CustomLink from "@/components/CustomLink";

const ProductDetails = ({ product, lang }) => {
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
              {product?.stock?.quantity >= 20 && (
                <span className="text-green-600">In Stock</span>
              )}
              {0 < product?.stock?.quantity &&
                product?.stock?.quantity < 20 && (
                  <span className="text-yellow-600">Limited Stock</span>
                )}
              {product?.stock?.quantity == 0 && (
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
            <p className="text-base text-gray-400 line-through">
              $
              {lang == "en"
                ? Math.round(product?.price)
                : convertNumberToBN(Math.round(product?.price))}
            </p>
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

          <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
            <a
              href="#"
              className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
            >
              <FaShoppingBag /> Add to cart
            </a>
            <a
              href="#"
              className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"
            >
              <LiaHeartSolid /> Wishlist
            </a>
          </div>

          <div className="flex gap-3 mt-4">
            <p className="text-red-500">SOCIAL SHARE</p>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
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
