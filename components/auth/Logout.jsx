"use client";

import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

const Logout = ({ lang }) => {
  return (
    <button
      onClick={() => {
        signOut({
          callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/login`,
        });
        toast.info("User logged out!");
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
