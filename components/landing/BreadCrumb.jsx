"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { HiHome } from "react-icons/hi";

const BreadCrumb = () => {
  const pathname = usePathname();
  if (pathname == "/bn" || pathname == "/en") return null;
  return (
    <div className="container py-4 flex items-center gap-3">
      <a href="../index.html" className="text-primary text-base">
        <i className="fa-solid fa-house"></i>
      </a>
      <span className="text-sm text-gray-400">
        <i className="fa-solid fa-chevron-right"></i>
      </span>
      <div className="text-gray-600 font-medium flex flex-row items-center">
        <Link href={"/"} className="hover:scale-105">
          <HiHome />{" "}
        </Link>
        {pathname
          .split("/")
          .splice(2)
          .map((path) => "  /  " + path)}
      </div>
    </div>
  );
};

export default BreadCrumb;
