"use client";

import useCartItems from "@/hooks/useCartItems";
import { useState, useEffect } from "react";

const QuantitySection = ({ productId }) => {
  const { cartItems, setCartItems } = useCartItems();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const cartItem = cartItems?.find(
      (item) => item?.productId?.toString() === productId?.toString()
    );
    if (cartItem) {
      setQuantity(cartItem?.quantity ?? 1);
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
          quantity: newQuantity,
        };
        return updatedCartItems;
      } else {
        return [...prevCartItems, { productId, quantity: newQuantity }];
      }
    });
  };

  return (
    <div className="mt-4 items-center">
      <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
      <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
        <button
          onClick={handleQuantityRemove}
          className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
        >
          -
        </button>
        <div className="h-8 w-8 text-base flex items-center justify-center">
          {quantity}
        </div>
        <button
          onClick={handleQuantityAdd}
          className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySection;
