"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/solid";

import { HiHome } from "react-icons/hi";
import CustomLink from "../CustomLink";

const pages = [
  { name: "Projects", href: "#", current: false },
  { name: "Project Nero", href: "#", current: true },
];
const BreadCrumb = () => {
  const pathname = usePathname();
  if (pathname == "/bn" || pathname == "/en") return null;

  let path = "";
  return (
    <div className="container py-4 flex items-center gap-3">
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          <li>
            <div>
              <CustomLink
                href="/"
                className="text-gray-400 hover:text-gray-500"
              >
                <HomeIcon
                  className="h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="sr-only">Home</span>
              </CustomLink>
            </div>
          </li>
          {pathname
            .split("/")
            .splice(2)
            .map((page, ind) => {
              path += "/" + String(page);
              return (
                <li key={ind}>
                  <div className="flex items-center">
                    <ChevronRightIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <CustomLink
                      href={path}
                      className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      {page}
                    </CustomLink>
                  </div>
                </li>
              );
            })}
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumb;
