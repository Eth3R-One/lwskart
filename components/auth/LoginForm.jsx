"use client";

import { login } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SpinnerLoader from "../SpinnerLoader";

const LoginForm = ({ lang }) => {
  const [error, setError] = useState("");
  const route = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleLogin = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    try {
      setError("");
      const formData = new FormData(event.currentTarget);
      const response = await login(formData);

      if (!!response?.error) {
        setError("Invalid Credentials");
        setIsSubmitted(false);
      } else {
        route.push(`/${lang}/account`);
      }
    } catch (err) {
      setError("Invalid Credentials");
      setIsSubmitted(false);
    }
  };
  return (
    <form onSubmit={handleLogin} autoComplete="on">
      {error && <div className="text-xl text-red-500 text-center">{error}</div>}
      <div className="space-y-2">
        <div>
          <label htmlFor="email" className="text-gray-600 mb-2 block">
            Email address
          </label>
          <input
            disabled={isSubmitted}
            type="email"
            name="email"
            id="email"
            required
            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
            placeholder="youremail.@domain.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-gray-600 mb-2 block">
            Password
          </label>
          <input
            disabled={isSubmitted}
            type="password"
            name="password"
            required
            id="password"
            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
            placeholder="*******"
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
          />
          <label
            htmlFor="remember"
            className="text-gray-600 ml-3 cursor-pointer"
          >
            Remember me
          </label>
        </div>
        <a href="#" className="text-primary">
          Forgot password
        </a>
      </div>
      <div className="mt-4">
        {isSubmitted ? (
          <div className="block py-2 bg-gray-200 text-center text-white border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium cursor-not-allowed">
            <SpinnerLoader />
          </div>
        ) : (
          <button
            type="submit"
            className={`block w-full py-2 bg-primary text-center text-white border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium ${
              isSubmitted && "cursor-not-allowed"
            }`}
          >
            Login
          </button>
        )}
      </div>
    </form>
  );
};

export default LoginForm;