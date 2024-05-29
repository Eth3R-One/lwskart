"use client";
import { CiHeart } from "react-icons/ci";
import CustomLink from "../CustomLink";
import useWishlist from "@/hooks/useWishlist";
import { useEffect } from "react";
import { getWishList } from "@/database/queries";

const WishListComponent = ({ wishListFromDB }) => {
  const { wishlist, setWishlist } = useWishlist();

  useEffect(() => {
    setWishlist(wishListFromDB);
  }, [setWishlist, wishListFromDB]);

  return (
    <CustomLink
      href="/wish-list"
      className="text-center text-gray-700 hover:text-primary transition relative hover:scale-110"
    >
      <div className="text-2xl relative">
        <CiHeart />
        {wishListFromDB?.length > 0 && (
          <div className="absolute right-2 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
            {wishListFromDB?.length}
          </div>
        )}
      </div>
      <p className="text-xs leading-3">wishlist</p>
    </CustomLink>
  );
};

export default WishListComponent;
