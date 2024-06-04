import { auth } from "@/auth";
import { getDictionary } from "../dictionaries";
import { redirect } from "next/navigation";
import PersonalProfileForm from "@/components/auth/profile/PersonalProfileForm";
import ShippingAddressForm from "@/components/auth/profile/ShippingAddressForm";
import BillingAddressForm from "@/components/auth/profile/BillingAddressForm";
import {
  getOrderHistory,
  getUserAddress,
  getUserByEmail,
  getUserById,
} from "@/database/queries";
import Link from "next/link";
import CustomLink from "@/components/CustomLink";

export const metadata = {
  title: "Account | LWSKart",
  description:
    "LWSKart is an app that shows various products with various categories. Buy your desired products",
  openGraph: {
    images: [
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=Account | LWSKart`,
    ],
  },
};

const AccountPage = async ({ params: { lang } }) => {
  const dictionary = await getDictionary(lang);
  const session = await auth();
  if (!session?.user) {
    redirect(`/${lang}/login`);
  }
  const user = await getUserByEmail(session?.user?.email);

  const address = await getUserAddress(user?.id);

  const orders = await getOrderHistory(user?.id);

  const formatDate = (orderDate) => {
    const date = new Date(orderDate);
    return `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
  };

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
        <div className="pt-10">
          <div>
            <p className="text-center text-3xl">Order History</p>
            <div>
              {orders.length > 0 ? (
                <div className="p-2">
                  <div>
                    <div className="px-5">
                      {orders?.map((order) => (
                        <div key={order?.id} className="container mb-10">
                          <div className="col-span-9 mt-9">
                            <div>
                              <div className="border-separate border border-gray-200 p-5 shadow-lg rounded-md">
                                <div className="flex justify-between items-center text-center">
                                  <div>
                                    <p className="my-2 font-medium">
                                      Order Number
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {order?.id}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="my-2 font-medium">
                                      Purchased
                                    </p>
                                    <p>{formatDate(order.createdAt)}</p>
                                  </div>
                                  <div>
                                    <p className="my-2 font-medium">Items</p>
                                    <p>{order?.items?.length}</p>
                                  </div>
                                  <div>
                                    <p className="my-2 font-medium">Total</p>
                                    <p>${order?.totalAmount}</p>
                                  </div>
                                  <div className="mr-14">
                                    <p className="my-2 font-medium">Status</p>
                                    <p className="text-red-400">
                                      {order?.status}
                                    </p>
                                  </div>

                                  <div className="mr-14">
                                    <p className="my-2 font-medium">Payment</p>
                                    <p className=" px-1 rounded-md">
                                      {order?.paymentMethod}
                                    </p>
                                    {order?.paymentStatus == "Paid" ? (
                                      <p className="bg-green-500 text-white rounded-md">
                                        {order?.paymentStatus}
                                      </p>
                                    ) : (
                                      <p className="bg-red-500 text-white rounded-md">
                                        {order?.paymentStatus}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        /* </div> */
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="p-10 items-center justify-center text-center gap-2">
                    <p className="">You have no order</p>
                    <CustomLink
                      href={`${lang}/shop/`}
                      className={"bg-purple-400 rounded-md px-2"}
                    >
                      Go to Shop
                    </CustomLink>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
