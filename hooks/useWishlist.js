const { WishlistContext } = require("@/context");
const { useContext } = require("react");

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export default useWishlist;
