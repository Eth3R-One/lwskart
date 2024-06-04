import { auth, signIn } from "@/auth";
import SocialLogings from "@/components/auth/SocialLogings";
import Link from "next/link";
import { getDictionary } from "../../(home)/dictionaries";
import LoginForm from "@/components/auth/LoginForm";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login | LWSKart",
  description:
    "LWSKart is an app that shows various products with various categories. Buy your desired products",
  openGraph: {
    images: [
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=Login | LWSKart`,
    ],
  },
};

const LoginPage = async ({ params: { lang } }) => {
  const dictionary = await getDictionary(lang);
  const session = await auth();
  if (session?.user) {
    redirect(`/${lang}/account`);
  }
  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1 text-center">
          Login
        </h2>
        <p className="text-gray-600 mb-6 text-sm text-center">
          welcome back customer
        </p>
        <LoginForm lang={lang} />

        <SocialLogings lang={lang} />

        <p className="mt-4 text-center text-gray-600">
          {`Don't`} have account?{" "}
          <Link href={`/${lang}/register`} className="text-primary">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
