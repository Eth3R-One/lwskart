import BreadCrumb from "@/components/landing/BreadCrumb";
import ProductsList from "@/components/landing/products/ProductsList";
import SideBar from "@/components/landing/products/SideBar";
import { getProducts } from "@/database/queries";
import Link from "next/link";

const refineSelectedCategory = (category) => {
  const decoded = decodeURI(category);
  if (decoded == "undefined") {
    return "";
  } else return decoded;
};

export const metadata = {
  title: "Shop | LWSKart",
  description:
    "LWSKart is an app that shows various products with various categories. Buy your desired products",
  openGraph: {
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=Shop | LWSKart`],
  },
};

const ShopPage = async ({
  params: { lang },
  searchParams: { category, search },
}) => {
  const products = await getProducts();
  return (
    <>
      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        <SideBar lang={lang} />
        <ProductsList
          products={products}
          lang={lang}
          selectedCategory={refineSelectedCategory(category)}
          searchQuery={refineSelectedCategory(search).split("+").join(" ")}
        />
      </div>
    </>
  );
};

export default ShopPage;
