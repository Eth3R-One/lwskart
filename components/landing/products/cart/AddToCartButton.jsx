"use client";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

const AddToCartButton = ({ productId }) => {
  const [session] = useSession();
  const router = useRouter();
  return <div>AddToCartButton</div>;
};

export default AddToCartButton;
