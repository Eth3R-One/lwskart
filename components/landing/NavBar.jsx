import { IoIosLogIn } from "react-icons/io";
import LanguageSwitcher from "../LanguageSwitcher";
import CustomLink from "@/components/CustomLink";
import { auth } from "@/auth";
import Image from "next/image";
import Logout from "../auth/Logout";

const NavBar = async ({ lang, dictionary, showLogin }) => {
  const Icon = IoIosLogIn;
  const session = await auth();
  return (
    <nav className="bg-gray-800">
      <div className="container flex">
        <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
          <span className="text-white">
            <i className="fa-solid fa-bars"></i>
          </span>
          <span className="capitalize ml-2 text-white ">
            {dictionary.allCategories}
          </span>

          <div
            className="absolute left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible w-[600px]"
            style={{ width: "300px" }}
          >
            <a
              href="#"
              className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
            >
              <img
                src="/assets/images/icons/sofa.svg"
                alt="sofa"
                className="w-5 h-5 object-contain"
              />
              <span className="ml-6 text-gray-600 text-sm">Sofa</span>
            </a>
            <a
              href="#"
              className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
            >
              <img
                src="/assets/images/icons/terrace.svg"
                alt="terrace"
                className="w-5 h-5 object-contain"
              />
              <span className="ml-6 text-gray-600 text-sm">Living Room</span>
            </a>
            <a
              href="#"
              className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
            >
              <img
                src="/assets/images/icons/bed.svg"
                alt="bed"
                className="w-5 h-5 object-contain"
              />
              <span className="ml-6 text-gray-600 text-sm">Bedroom</span>
            </a>
            <a
              href="#"
              className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
            >
              <img
                src="/assets/images/icons/office.svg"
                alt="Outdoor"
                className="w-5 h-5 object-contain"
              />
              <span className="ml-6 text-gray-600 text-sm">Outdoor</span>
            </a>
            <a
              href="#"
              className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
            >
              <img
                src="/assets/images/icons/outdoor-cafe.svg"
                alt="outdoor"
                className="w-5 h-5 object-contain"
              />
              <span className="ml-6 text-gray-600 text-sm">Outdoor</span>
            </a>
            <a
              href="#"
              className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
            >
              <img
                src="/assets/images/icons/bed-2.svg"
                alt="Mattress"
                className="w-5 h-5 object-contain"
              />
              <span className="ml-6 text-gray-600 text-sm">Mattress</span>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
          <div className="flex items-center space-x-6 capitalize ">
            <CustomLink
              href="/"
              className="text-gray-200 transition hover:text-primary"
            >
              {dictionary.home}
            </CustomLink>
            <CustomLink
              href="/shop"
              className="text-gray-200 hover:text-primary transition"
            >
              {dictionary.shop}
            </CustomLink>
            <CustomLink
              href="/about-us"
              className="text-gray-200 hover:text-primary transition"
            >
              {dictionary.aboutUs}
            </CustomLink>
            <CustomLink
              href="/contact-us"
              className="text-gray-200 hover:text-primary transition"
            >
              {dictionary.contactUs}
            </CustomLink>
          </div>
          {showLogin &&
            (session?.user ? (
              <div className="flex flex-row gap-1 items-center text-white">
                <span>
                  <Image
                    src={session?.user?.image}
                    width={24}
                    height={24}
                    alt={session?.user?.name}
                    className="rounded-full"
                  />
                </span>
                <span className="text-white">{session?.user?.name}</span>|{" "}
                <span className="hover:text-primary hover:scale-105">
                  <Logout lang={lang} />
                </span>
              </div>
            ) : (
              <CustomLink
                href="/login"
                className="text-gray-200 transition flex flex-row items-center gap-1 hover:scale-110 hover:text-primary"
              >
                {dictionary.login} <Icon />
              </CustomLink>
            ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
