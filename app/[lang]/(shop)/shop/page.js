import BreadCrumb from "@/components/landing/BreadCrumb";
import ProductsList from "@/components/landing/products/ProductsList";
import SideBar from "@/components/landing/products/SideBar";
import Link from "next/link";

const ShopPage = () => {
  return (
    <>
      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        <SideBar />
        <ProductsList />
      </div>
    </>
  );
};

export default ShopPage;
