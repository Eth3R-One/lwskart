"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const SocialLogings = ({ lang }) => {
  const router = useRouter();
  const query = useSearchParams();

  let redirect = query.get("redirect");
  let redirectUrl;
  if (redirect) {
    const queryParams = new URLSearchParams(query);

    redirectUrl = `/${lang}/${redirect}`;
    if (queryParams.toString()) {
      redirectUrl += `?${queryParams.toString()}`;
    }
  }
  const handleGoogleLogin = (event, redirectUrl) => {
    signIn("google", {
      callbackUrl:
        redirectUrl ?? `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/account`,
    });
  };
  const handleFacebookLogin = (event) => {};
  return (
    <>
      <div className="mt-6 flex justify-center relative">
        <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
          Or login with
        </div>
        <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
      </div>
      <div className="mt-4 flex gap-4">
        <button
          onClick={(e) => handleGoogleLogin(e, redirectUrl)}
          className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500"
        >
          google
        </button>
      </div>
    </>
  );
};

export default SocialLogings;
