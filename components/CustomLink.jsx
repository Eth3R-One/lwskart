"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

const CustomLink = ({ children, href, className }) => {
  const { lang } = useParams();
  return (
    <Link href={`/${lang}/${href}`} className={className}>
      {children}
    </Link>
  );
};

export default CustomLink;
