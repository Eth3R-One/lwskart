import Image from "next/image";
import CustomLink from "../CustomLink";
import { BsCartCheck } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaRegUser, FaSearch } from "react-icons/fa";
import LanguageSwitcher from "../LanguageSwitcher";
import WishListComponent from "./WishListComponent";
import { auth } from "@/auth";
import { getCartItems, getUserByEmail, getWishList } from "@/database/queries";
import CartItemsComponent from "./products/cart/CartListComponent";
import SearchComponent from "../SearchComponent";

const Header = async ({ dictionary }) => {
  const session = await auth();
  let wishlist;
  let cartItems;

  if (session?.user) {
    const user = await getUserByEmail(session?.user?.email);
    const wishlistData = await getWishList(user.id);
    wishlist = wishlistData?.products.map((product) => product._id.toString());
    cartItems = await getCartItems(user?.id);
  }
  return (
    <header className="py-4 shadow-sm bg-white">
      <div className="container flex items-center justify-between">
        <CustomLink href="/">
          <Image
            src="/assets/images/logo.svg"
            alt="Logo"
            height={94}
            width={94}
            className="w-32"
          />
        </CustomLink>
        <SearchComponent dictionary={dictionary} />
        <div className="flex items-center space-x-4 justify-end">
          <WishListComponent wishListFromDB={wishlist} />
          <CartItemsComponent cartItemsFromDB={cartItems} />

          <CustomLink
            href="/account"
            className="text-center text-gray-700 hover:text-primary transition relative hover:scale-110"
          >
            <div className="text-2xl items-center">
              <FaRegUser />
            </div>
            <div className="text-xs leading-3 flex flex-row gap-1 items-center">
              {dictionary.account}
            </div>
          </CustomLink>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
