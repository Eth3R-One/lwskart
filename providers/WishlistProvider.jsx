"use client";
import { WishlistContext } from "@/context";
import { useState } from "react";

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
