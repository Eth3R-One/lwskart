"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

const CustomLink = ({ children, href, className, title }) => {
  const { lang } = useParams();
  return (
    <Link href={`/${lang}/${href}/`} className={className} title={title}>
      {children}
    </Link>
  );
};

export default CustomLink;
