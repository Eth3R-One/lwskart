import { auth } from "@/auth";
import { getDictionary } from "../dictionaries";
import { redirect } from "next/navigation";
import PersonalProfileForm from "@/components/auth/profile/PersonalProfileForm";
import ShippingAddressForm from "@/components/auth/profile/ShippingAddressForm";
import BillingAddressForm from "@/components/auth/profile/BillingAddressForm";
import { getUserAddress, getUserById } from "@/database/queries";

const AccountPage = async ({ params: { lang } }) => {
  const dictionary = await getDictionary(lang);
  const session = await auth();
  if (!session?.user) {
    redirect(`/${lang}/login`);
  }

  const user = await getUserById(session?.user?.id);

  const address = await getUserAddress(session?.user?.id);
  return (
    <>
      <div className="container  items-start gap-6 pt-4 pb-16">
        <div className=" grid grid-cols-3 gap-4 mx-auto max-w-5xl">
          <PersonalProfileForm dictionary={dictionary} user={user} />

          <ShippingAddressForm
            dictionary={dictionary}
            user={user}
            address={address}
          />

          <BillingAddressForm
            dictionary={dictionary}
            user={user}
            address={address}
          />
        </div>
      </div>
    </>
  );
};

export default AccountPage;
