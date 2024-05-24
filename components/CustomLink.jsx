"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

const CustomLink = ({ children, href, searchParams, className, title }) => {
  const { lang } = useParams();
  let link = `/${lang}/${href}`;

  if (searchParams) {
    const url = new URLSearchParams();

    for (const key in searchParams) {
      url.append(key, searchParams[key]);
    }

    link += `?${url.toString()}`;
  }
  return (
    <Link href={link} className={className} title={title}>
      {children}
    </Link>
  );
};

export default CustomLink;
