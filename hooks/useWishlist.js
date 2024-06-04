import { WishlistContext } from "@/context";
import { useContext } from "react";

const useWishlist = () => {
  return useContext(WishlistContext);
};

export default useWishlist;
