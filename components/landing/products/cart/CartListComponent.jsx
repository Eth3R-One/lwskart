"use client";
import { BsCartCheck } from "react-icons/bs";
import { useEffect } from "react";
import useCartItems from "@/hooks/useCartItems";
import CustomLink from "@/components/CustomLink";

const CartItemsComponent = ({ cartItemsFromDB }) => {
  const { cartItems, setCartItems } = useCartItems();

  useEffect(() => {
    if (cartItemsFromDB) {
      setCartItems(cartItemsFromDB);
    } else {
      setCartItems([]);
    }
  }, [cartItemsFromDB]);

  return (
    <CustomLink
      href="/cart"
      className="text-center text-gray-700 hover:text-primary transition relative hover:scale-110"
    >
      <div className="text-2xl relative">
        <BsCartCheck />
        {cartItemsFromDB?.length > 0 && (
          <div className="absolute -right-2 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
            {cartItemsFromDB?.length}
          </div>
        )}
      </div>
      <p className="text-xs leading-3">Cart</p>
    </CustomLink>
  );
};

export default CartItemsComponent;
