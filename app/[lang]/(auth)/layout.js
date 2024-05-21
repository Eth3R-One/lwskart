import { Inter } from "next/font/google";
import "../../globals.css";
import "@ionic/react/css/core.css";

import Header from "@/components/landing/Header";
import NavBar from "@/components/landing/NavBar";
import Footer from "@/components/landing/Footer";
import CopyRightSection from "@/components/landing/CopyRightSection";
import BreadCrumb from "@/components/landing/BreadCrumb";
import { getDictionary } from "../(home)/dictionaries";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home | LWSkart",
  description:
    "An ecommerce app created with nextjs with mongodb database and next-auth",
};

export default async function RootLayout({ params: { lang }, children }) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Header dictionary={dictionary} />
      <NavBar dictionary={dictionary} showLogin={false} />
      <BreadCrumb />
      {children}
      <Footer />
      <CopyRightSection />
    </>
  );
}
