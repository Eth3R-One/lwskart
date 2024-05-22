import Image from "next/image";
import Link from "next/link";
import CustomLink from "../CustomLink";
import { BsCartCheck } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaRegUser, FaSearch } from "react-icons/fa";
import LanguageSwitcher from "../LanguageSwitcher";

const Header = ({ dictionary }) => {
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
        <div className="w-full max-w-xl relative flex px-1">
          <span className="absolute left-4 top-3 text-lg text-gray-400">
            <FaSearch />
          </span>
          <input
            type="search"
            name="search"
            id="search"
            className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
            placeholder={dictionary.search}
          />
          <button className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex items-center">
            {dictionary.search}
          </button>
        </div>
        <div className="flex items-center space-x-4 justify-center gap-5 px-2">
          <CustomLink
            href="/wish-list"
            className="text-center text-gray-700 hover:text-primary transition relative hover:scale-110"
          >
            <div className="text-2xl relative">
              <CiHeart />
              <div className="absolute right-2 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                8
              </div>
            </div>
            <p className="text-xs leading-3">wishlist</p>
          </CustomLink>

          <CustomLink
            href="/cart"
            className="text-center text-gray-700 hover:text-primary transition relative hover:scale-110"
          >
            <div className="text-2xl relative">
              <BsCartCheck />
              <div className="absolute -right-2 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                2
              </div>
            </div>
            <p className="text-xs leading-3">cart</p>
          </CustomLink>

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
