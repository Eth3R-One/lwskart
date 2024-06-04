import AdsSection from "@/components/landing/AdsSection";
import BannerSection from "@/components/landing/BannerSection";
import CategoriesList from "@/components/landing/categories/CategoriesList";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TrendingProducts from "@/components/landing/products/TrendingProducts";
import TopNewArrivalSection from "@/components/landing/products/TopNewArrivalSection";
import Image from "next/image";
import { getDictionary } from "./dictionaries";

export const metadata = {
  title: "LWSKart",
  description:
    "LWSKart is an app that shows various products with various categories. Buy your desired products",
  openGraph: {
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/api/og`],
  },
};

export default async function Home({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  return (
    <>
      <BannerSection dictionary={dictionary} />
      <FeaturesSection dictionary={dictionary} />
      <CategoriesList dictionary={dictionary} />
      <TopNewArrivalSection dictionary={dictionary} />
      <AdsSection />
      <TrendingProducts dictionary={dictionary} />
    </>
  );
}
