import Image from "next/image";
import Link from "next/link";
import { BsCartCheck } from "react-icons/bs";
import { BsBagHeart } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  return (
    <header className="py-4 shadow-sm bg-white">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            alt="Logo"
            height={32}
            width={32}
            className="w-32"
          />
        </Link>

        <div className="w-full max-w-xl relative flex px-1">
          <span className="absolute left-4 top-3 text-lg text-gray-400">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="search"
            name="search"
            id="search"
            className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
            placeholder="search"
          />
          <button className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex items-center">
            Search
          </button>
        </div>

        <div className="flex items-center space-x-4 justify-center gap-5 px-2">
          <Link
            href="/wish-list"
            className="text-center text-gray-700 hover:text-primary transition relative hover:scale-110"
          >
            <div className="text-2xl">
              <i className="fa-regular fa-heart"></i>
            </div>
            <div className="text-xs leading-3 ">
              <BsBagHeart size={20} />
              <div className="absolute -right-4 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs p-1">
                8
              </div>
            </div>
          </Link>
          <Link
            href="/cart"
            className="text-center text-gray-700 hover:text-primary transition relative hover:scale-110"
          >
            <div className="text-2xl">
              <i className="fa-solid fa-bag-shopping"></i>
            </div>
            <div className="text-xs leading-3 ">
              <BsCartCheck size={20} />
              <div className="absolute -right-4 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                2
              </div>
            </div>
          </Link>
          <Link
            href="/account"
            className="text-center text-gray-700 hover:text-primary transition relative hover:scale-110"
          >
            <div className="text-2xl">
              <i className="fa-regular fa-user"></i>
            </div>
            <div className="text-xs leading-3 flex flex-row gap-1 items-center align-middle">
              Account
              <FaRegUser scale={20} />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
