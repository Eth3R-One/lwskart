import { CartItemsContext } from "@/context";
import { useContext } from "react";

const useCartItems = () => {
  return useContext(CartItemsContext);
};

export default useCartItems;
