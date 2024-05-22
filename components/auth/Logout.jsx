"use client";

import { signOut } from "next-auth/react";

const Logout = ({ lang }) => {
  return (
    <button
      onClick={() =>
        signOut({ callbackUrl: `http://localhost:3000/${lang}/login` })
      }
    >
      Logout
    </button>
  );
};

export default Logout;
