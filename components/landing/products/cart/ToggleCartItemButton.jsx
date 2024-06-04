"use client";
import useCartItems from "@/hooks/useCartItems";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { toggleWishList, updateCart } from "@/app/actions";
import useWishlist from "@/hooks/useWishlist";
import { toast } from "react-toastify";

const ToggleCartItemButton = ({ productId, userId, className, children }) => {
  const router = useRouter();
  const { lang } = useParams();

  const { cartItems, setCartItems } = useCartItems();
  const { wishlist } = useWishlist();
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const status = cartItems?.findIndex(
      (item) => item?.productId?.toString() === productId?.toString()
    );
    if (
      status > -1 &&
      cartItems[status]?.title != undefined &&
      cartItems[status].quantity > 0
    ) {
      setIsInCart(status > -1);
    }
  }, [cartItems, productId]);

  const handleAddToCartClick = async (event) => {
    event.preventDefault();
    if (userId) {
      const updatedInCartStatus = !isInCart;

      setIsInCart(updatedInCartStatus);

      await updateCartItems(productId, updatedInCartStatus);
    } else {
      const existingItemIndex = cartItems?.findIndex(
        (item) => item?.productId?.toString() === productId?.toString()
      );

      const quantity =
        existingItemIndex >= 0
          ? cartItems[existingItemIndex]?.newQuantity ??
            cartItems[existingItemIndex]?.quantity
          : 1;

      router.push(
        `/${lang}/login?redirect=/cart&productId=${productId}&quantity=${quantity}`
      );
    }
  };

  const updateCartItems = async (productId, added) => {
    // Update cart items in the database
    try {
      const existingItemIndex = cartItems?.findIndex(
        (item) => item?.productId?.toString() === productId?.toString()
      );
      let updatedCartItems;
      if (existingItemIndex > -1) {
        updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          added,
          quantity: added
            ? cartItems[existingItemIndex]?.newQuantity ??
              updatedCartItems[existingItemIndex]?.quantity
            : 0,
        };
      } else {
        updatedCartItems = added
          ? [...cartItems, { productId, added: true, quantity: 1 }]
          : cartItems;
      }
      const res = await updateCart(
        userId,
        productId,
        added
          ? cartItems[existingItemIndex]?.newQuantity ??
              updatedCartItems[existingItemIndex]?.quantity
          : 0
      );

      if (res.status === 200) {
        const listOfWishlist = wishlist ?? [];
        const wishlistIndex = listOfWishlist.indexOf(productId);
        if (wishlistIndex > -1) {
          const response = await toggleWishList(userId, productId);
        }

        setCartItems(updatedCartItems);

        added
          ? toast.success("Item added to cart")
          : toast.info("Item removed from cart");
      }
    } catch (err) {
      console.error("Failed to update cart items in DB:", err);
      toast.error(err?.message ?? err);
    }
  };

  return (
    <button
      onClick={handleAddToCartClick}
      className={
        className ??
        "border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"
      }
    >
      {children ? (
        children
      ) : isInCart ? (
        <div className="flex flex-row justify-center align-middle items-center gap-5">
          <FaCartShopping /> Remove from cart
        </div>
      ) : (
        <div className="flex flex-row justify-center align-middle items-center gap-5">
          <FaShoppingBag /> Add to cart
        </div>
      )}
    </button>
  );
};

export default ToggleCartItemButton;
