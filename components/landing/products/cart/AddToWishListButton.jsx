"use client";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { LiaHeartSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { getUserByEmail } from "@/database/queries";
import { toggleWishList } from "@/app/actions";
import useWishlist from "@/hooks/useWishlist";

const AddToWishListButton = ({ productId, isWishlisted, userId, children }) => {
  const { data, status } = useSession();
  const router = useRouter();
  const { lang } = useParams();

  const { wishlist, setWishlist } = useWishlist();

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
        } else {
          console.error("Failed to update wishlist");
        }
      } catch (err) {
        console.error("Error toggling wishlist:", err);
      }
    } else {
      router.push(`/${lang}/login?redirect=/wish-list&productId=${productId}`);
    }
  };

  return (
    <button
      onClick={handleWishListClick}
      className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
    >
      {children ? children : <LiaHeartSolid />}
    </button>
  );
};

export default AddToWishListButton;
