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

const ShopPage = async ({ params: { lang }, searchParams: { category } }) => {
  const products = await getProducts();
  return (
    <>
      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        <SideBar lang={lang} />
        <ProductsList
          products={products}
          lang={lang}
          selectedCategory={refineSelectedCategory(category)}
        />
      </div>
    </>
  );
};

export default ShopPage;
