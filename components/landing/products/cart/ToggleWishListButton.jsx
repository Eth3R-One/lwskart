"use client";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { toggleWishList } from "@/app/actions";
import useWishlist from "@/hooks/useWishlist";

import { LiaHeartSolid } from "react-icons/lia";
import { FaRegHeart } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const ToggleWishListButton = ({ productId, userId, className, children }) => {
  const router = useRouter();
  const { lang } = useParams();

  const { wishlist, setWishlist } = useWishlist();

  const [isWishListed, setIsWishlisted] = useState(false);

  useEffect(() => {
    const status = wishlist?.some(
      (prod) => prod?.toString() == productId?.toString()
    );
    if (status) {
      setIsWishlisted(true);
    } else {
      setIsWishlisted(false);
    }
  }, [productId, wishlist]);
  const handleWishListClick = async (event) => {
    event.preventDefault();
    if (userId) {
      try {
        const res = await toggleWishList(userId, productId);
        if (res.status === 201) {
          const updatedWishlist = wishlist ? [...wishlist] : [];
          const productIndex = updatedWishlist.indexOf(productId);

          if (productIndex === -1) {
            updatedWishlist.push(productId);
          } else {
            updatedWishlist.splice(productIndex, 1);
          }

          setWishlist(updatedWishlist);
          if (isWishListed) {
            toast.info("Item removed from wishlist");
          } else {
            toast.success("Item added to wishlist");
          }
          setIsWishlisted(!isWishListed);
        } else {
          console.error("Failed to update wishlist");
          toast.error("Something went wrong");
        }
      } catch (err) {
        console.error("Error toggling wishlist:", err);
        toast.error("Something went wrong");
      }
    } else {
      router.push(`/${lang}/login?redirect=/wish-list&productId=${productId}`);
      toast.info("Login in first");
    }
  };

  return (
    <button
      onClick={handleWishListClick}
      className={
        className ??
        "text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
      }
      title={isWishListed ? "Remove from wishlist" : `Add to wishlist`}
    >
      {children ? (
        isWishListed ? (
          <>
            <LiaHeartSolid size={25} /> Remove from wishlist
          </>
        ) : (
          <>
            <LiaHeartSolid /> Add to Wishlist
          </>
        )
      ) : isWishListed ? (
        <MdDelete />
      ) : (
        <FaRegHeart />
      )}
    </button>
  );
};

export default ToggleWishListButton;
