"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import SpinnerLoader from "../SpinnerLoader";

const RegisterForm = ({ lang }) => {
  const [error, setError] = useState("");
  const [status, setStatus] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(true);
    setError("");
    try {
      const formData = new FormData(event.currentTarget);
      const password = formData.get("password");
      const confirmPass = formData.get("confirm");
      if (password != confirmPass) {
        throw new Error("Password mismatch! Type carefully");
      }
      const name = formData.get("name");
      const email = formData.get("email");
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
          email,
        }),
      });
      if (res.status === 201) {
        router.push(`/${lang}/login`);
      }
      if (res.status === 500) {
        setError("Email exist!");
      }
    } catch (err) {
      setError(err?.message);
    } finally {
      setStatus(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="text-red-500 text-center text-xl ">{error && error}</div>
      <div className="space-y-2">
        <div>
          <label htmlFor="name" className="text-gray-600 mb-2 block">
            Full Name
          </label>
          <input
            disabled={status}
            type="text"
            name="name"
            required
            id="name"
            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
            placeholder="fulan fulana"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-gray-600 mb-2 block">
            Email address
          </label>
          <input
            disabled={status}
            type="email"
            name="email"
            required
            id="email"
            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
            placeholder="youremail.@domain.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-gray-600 mb-2 block">
            Password
          </label>
          <input
            disabled={status}
            type="password"
            name="password"
            required
            id="password"
            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
            placeholder="*******"
          />
        </div>
        <div>
          <label htmlFor="confirm" className="text-gray-600 mb-2 block">
            Confirm password
          </label>
          <input
            disabled={status}
            type="password"
            name="confirm"
            required
            id="confirm"
            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
            placeholder="*******"
          />
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center">
          <input
            disabled={status}
            type="checkbox"
            name="aggrement"
            required
            id="aggrement"
            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
          />
          <label
            htmlFor="aggrement"
            className="text-gray-600 ml-3 cursor-pointer"
          >
            I have read and agree to the{" "}
            <a href="#" className="text-primary">
              terms & conditions
            </a>
          </label>
        </div>
      </div>
      <div className="mt-4">
        {status ? (
          <div className="w-full block py-2 text-center text-white bg-gray-200 border border-primary rounded hover:bg-transparent  text-primary transition uppercase font-roboto font-medium cursor-not-allowed">
            Creating account{" "}
            <span>
              <SpinnerLoader />
            </span>
          </div>
        ) : (
          <button
            type="submit"
            className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
          >
            create account
          </button>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;
