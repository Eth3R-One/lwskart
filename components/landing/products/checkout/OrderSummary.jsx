"use client";

import useCartItems from "@/hooks/useCartItems";
import { getDiscountPrice } from "@/utils/discount-price-utils";
import QuantitySection from "../QuantitySection";
import ToggleCartItemButton from "../cart/ToggleCartItemButton";
import { MdDelete } from "react-icons/md";
import CustomLink from "@/components/CustomLink";

const OrderSummary = ({ user }) => {
  const { cartItems, setCartItems } = useCartItems();

  const calculateTotal = (cartItems) => {
    return Math.round(
      cartItems?.reduce((total, item) => {
        const discountedPrice =
          item?.product?.price * (1 - item?.product?.discountPercentage / 100);
        return total + discountedPrice * item?.quantity;
      }, 0)
    );
  };

  return (
    <div className="col-span-4 border border-gray-200 p-4 rounded">
      <h4 className="text-gray-800 text-lg border-b pb-2 mb-4 font-medium uppercase text-center">
        order summary
      </h4>
      {cartItems?.length > 0 ? (
        <>
          <div className="space-y-2 pb-10">
            {cartItems?.map((item) => (
              <div
                key={item?.id}
                className="grid grid-cols-3 justify-between items-center pb-2 border-b"
              >
                <div>
                  <p
                    className={` font-medium ${
                      item?.quantity > item?.product?.quantity
                        ? "text-red-500"
                        : "text-gray-800"
                    }`}
                  >
                    {item?.title}
                  </p>
                  {item?.product?.quantity > 0 &&
                    item?.quantity > item?.product?.quantity && (
                      <p className="text-xs text-red-500">
                        (Available stock: {item?.product?.quantity} )
                      </p>
                    )}
                  {item?.product?.quantity == 0 && (
                    <p className="text-xs text-red-500">(No stock, Remove)</p>
                  )}
                </div>
                <QuantitySection
                  userId={user?.id}
                  productId={item?.productId}
                />
                <div className="flex flex-row gap-5 items-center justify-end">
                  <p className="text-gray-800 font-medium">
                    $
                    {item?.quantity *
                      getDiscountPrice(
                        item?.product?.price,
                        item?.product?.discountPercentage
                      )}
                  </p>
                  <ToggleCartItemButton
                    userId={user?.id}
                    productId={item?.id}
                    className={"hover:scale-125 text-primary"}
                  >
                    <MdDelete size={24} />
                  </ToggleCartItemButton>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between border-b border-gray-200 mt-1 pt-5 text-gray-800 font-medium py-3 uppercas">
            <p>subtotal</p>
            <p>${calculateTotal(cartItems)}</p>
          </div>

          <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
            <p>shipping</p>
            <p>$80</p>
          </div>

          <div className="flex justify-between text-gray-800 font-medium py-3 uppercase">
            <p className="font-semibold">Total</p>
            <p>${calculateTotal(cartItems) + 80}</p>
          </div>
        </>
      ) : (
        <div className=" flex flex-col items-center justify-center">
          <p className="bg-rose-500 text-white px-20 text-center py-5 rounded-md">
            {`You have no item in the cart`}
          </p>
          <CustomLink href={`shop`} className="pt-5 hover:text-primary">
            Go to shop
          </CustomLink>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
