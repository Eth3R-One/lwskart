"use client";
import { CartItemsContext } from "@/context";
import { useState } from "react";

const initialItem = {
  productId: "",
  quantity: 1,
};

const CartItemsProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  return (
    <CartItemsContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartItemsContext.Provider>
  );
};

export default CartItemsProvider;
