import { auth } from "@/auth";
import { getDictionary } from "../dictionaries";
import { redirect } from "next/navigation";
import PersonalProfileForm from "@/components/auth/profile/PersonalProfileForm";
import ShippingAddressForm from "@/components/auth/profile/ShippingAddressForm";
import BillingAddressForm from "@/components/auth/profile/BillingAddressForm";

const AccountPage = async ({ params: { lang } }) => {
  const dictionary = await getDictionary(lang);
  const session = await auth();
  if (!session?.user) {
    redirect(`/${lang}/login`);
  }
  return (
    <>
      <div className="container  items-start gap-6 pt-4 pb-16">
        <div className=" grid grid-cols-3 gap-4 mx-auto max-w-5xl">
          <PersonalProfileForm dictionary={dictionary} />

          <ShippingAddressForm dictionary={dictionary} />

          <BillingAddressForm dictionary={dictionary} />
        </div>
      </div>
    </>
  );
};

export default AccountPage;
