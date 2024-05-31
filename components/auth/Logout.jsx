"use client";

import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

const Logout = ({ lang }) => {
  return (
    <button
      onClick={() => {
        signOut({
          callbackUrl: `http://localhost:3000/${lang}/login`,
        });
        toast.info("User logged out!");
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
