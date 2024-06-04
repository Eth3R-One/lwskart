import { auth } from "@/auth";
import CustomLink from "@/components/CustomLink";
import RegisterForm from "@/components/auth/RegisterForm";
import SocialLogings from "@/components/auth/SocialLogings";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Register | LWSKart",
  description:
    "LWSKart is an app that shows various products with various categories. Buy your desired products",
  openGraph: {
    images: [
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=Register | LWSKart`,
    ],
  },
};

const RegistrationPage = async ({ params: { lang } }) => {
  const session = await auth();
  if (session?.user) {
    redirect(`/${lang}/account/`);
  }
  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">
          Create an account
        </h2>
        <p className="text-gray-600 mb-6 text-sm">Register for new cosutumer</p>
        <RegisterForm lang={lang} />

        <SocialLogings lang={lang} />

        <p className="mt-4 text-center text-gray-600">
          Already have account?{" "}
          <CustomLink href="/login" className="text-primary">
            Login now
          </CustomLink>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
