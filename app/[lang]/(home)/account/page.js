import { auth } from "@/auth";
import { getDictionary } from "../dictionaries";
import { redirect } from "next/navigation";

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
          <div className="shadow rounded bg-white px-4 pt-6 pb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800 text-lg">
                {dictionary.personalProfile}
              </h3>
              <a href="#" className="text-primary">
                {dictionary.edit}
              </a>
            </div>
            <div className="space-y-1">
              <h4 className="text-gray-700 font-medium">John Doe</h4>
              <p className="text-gray-800">example@mail.com</p>
              <p className="text-gray-800">0811 8877 988</p>
            </div>
          </div>

          <div className="shadow rounded bg-white px-4 pt-6 pb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800 text-lg">
                {dictionary.shipAddress}
              </h3>
              <a href="#" className="text-primary">
                {dictionary.edit}
              </a>
            </div>
            <div className="space-y-1">
              <h4 className="text-gray-700 font-medium">John Doe</h4>
              <p className="text-gray-800">Medan, North Sumatera</p>
              <p className="text-gray-800">20371</p>
              <p className="text-gray-800">0811 8877 988</p>
            </div>
          </div>

          <div className="shadow rounded bg-white px-4 pt-6 pb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800 text-lg">
                {dictionary.billAddress}
              </h3>
              <a href="#" className="text-primary">
                {dictionary.edit}
              </a>
            </div>
            <div className="space-y-1">
              <h4 className="text-gray-700 font-medium">John Doe</h4>
              <p className="text-gray-800">Medan, North Sumatera</p>
              <p className="text-gray-800">20317</p>
              <p className="text-gray-800">0811 8877 988</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
