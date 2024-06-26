import { SessionProvider } from "next-auth/react";

import { Inter } from "next/font/google";
import "./globals.css";
import "@ionic/react/css/core.css";

import Header from "@/components/landing/Header";
import NavBar from "@/components/landing/NavBar";
import Footer from "@/components/landing/Footer";
import CopyRightSection from "@/components/landing/CopyRightSection";
import BreadCrumb from "@/components/landing/BreadCrumb";
import WishlistProvider from "@/providers/WishlistProvider";
import CartItemsProvider from "@/providers/CartItemsProvider";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderStatusProvider from "@/providers/OrderStatusProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home | LWSkart",
  description:
    "An ecommerce app created with nextjs with mongodb database and next-auth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
        <SessionProvider>
          <WishlistProvider>
            <CartItemsProvider>
              <OrderStatusProvider>{children}</OrderStatusProvider>
            </CartItemsProvider>
          </WishlistProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
