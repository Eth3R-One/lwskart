"use client";

import useCartItems from "@/hooks/useCartItems";
import { useState, useEffect } from "react";

import { TiTick } from "react-icons/ti";
import { ImCancelCircle } from "react-icons/im";
import { updateCart } from "@/app/actions";

const QuantitySection = ({ userId, productId }) => {
  const { cartItems, setCartItems } = useCartItems();
  const [quantity, setQuantity] = useState(1);

  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const cartItem = cartItems?.find(
      (item) => item?.productId?.toString() === productId?.toString()
    );
    if (cartItem) {
      setQuantity(cartItem?.newQuantity ?? cartItem?.quantity ?? 1);

      if (cartItem?.quantity && cartItem?.newQuantity) {
        setIsUpdated(cartItem?.newQuantity != cartItem?.quantity);
      }
    }
  }, [cartItems, productId]);

  const handleQuantityAdd = (event) => {
    event.preventDefault();
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCartItems(productId, newQuantity);
  };

  const handleQuantityRemove = (event) => {
    event.preventDefault();
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCartItems(productId, newQuantity);
    }
  };

  const updateCartItems = (productId, newQuantity) => {
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems?.findIndex(
        (item) => item?.productId?.toString() == productId?.toString()
      );
      if (existingItemIndex > -1) {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          newQuantity,
        };
        return updatedCartItems;
      } else {
        return [...prevCartItems, { productId, newQuantity }];
      }
    });
  };

  const handleQuantityUpdate = async (event) => {
    event.preventDefault();
    try {
      console.log("quantity section -> 68");
      const res = await updateCart(userId, productId, quantity);

      setCartItems((prevCartItems) => {
        const existingItemIndex = prevCartItems?.findIndex(
          (item) => item?.productId?.toString() == productId?.toString()
        );
        if (existingItemIndex > -1) {
          const updatedCartItems = [...prevCartItems];
          updatedCartItems[existingItemIndex] = {
            ...updatedCartItems[existingItemIndex],
            quantity,
          };
          return updatedCartItems;
        } else {
          return [...prevCartItems, { productId, quantity }];
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleQuantityReset = (event) => {
    event.preventDefault();

    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems?.findIndex(
        (item) => item?.productId?.toString() == productId?.toString()
      );
      if (existingItemIndex > -1) {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          newQuantity: updatedCartItems[existingItemIndex]?.quantity,
        };
        return updatedCartItems;
      } else {
        return [
          ...prevCartItems,
          { productId, newQuantity: quantity, quantity },
        ];
      }
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex border rounded-md border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
        <button
          onClick={handleQuantityRemove}
          className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none hover:bg-gray-200 "
        >
          -
        </button>
        <div className="h-8 w-8 text-base flex items-center justify-center">
          {quantity}
        </div>
        <button
          onClick={handleQuantityAdd}
          className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none hover:bg-gray-200"
        >
          +
        </button>
      </div>
      {isUpdated && (
        <div className=" flex flex-row gap-2 items-center p-1  justify-items-start">
          <button
            onClick={handleQuantityUpdate}
            title="Update Quantity"
            className="bg-green-700 rounded-full text-white hover:bg-green-100 cursor-pointer px-3 hover:text-green-700 hover:scale-125"
          >
            <TiTick />
          </button>
          <button
            onClick={handleQuantityReset}
            title="Cancle"
            className="bg-red-700 rounded-full cursor-pointer text-white hover:bg-inherit hover:text-red-700 hover:scale-125"
          >
            <ImCancelCircle />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuantitySection;
