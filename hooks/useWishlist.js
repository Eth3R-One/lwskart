const { WishlistContext } = require("@/context");
const { useContext } = require("react");

const useWishlist = () => {
  return useContext(WishlistContext);
};

export default useWishlist;
