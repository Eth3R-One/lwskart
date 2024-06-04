"use client";

import { Fragment, useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

import { Dialog, Transition } from "@headlessui/react";
import useCartItems from "@/hooks/useCartItems";
import PaymentModal from "./Payment/PaymentModal";
import { addOrder } from "@/app/actions";
import { useRouter } from "next/navigation";
import SpinnerLoader from "@/components/SpinnerLoader";

const TermsAndCondition = ({ open, setOpen }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 sm:mt-5">
                    <Dialog.Title
                      as="h1"
                      className=" pb-5 font-semibold leading-6 text-center text-"
                    >
                      Terms & Conditions
                    </Dialog.Title>
                    <div className="px-5">
                      <ul className="text-gray-600">
                        <li className="pb-2">
                          1. Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Neque natus corporis odit, libero magni nulla
                          accusamus, consequuntur unde suscipit error nesciunt!
                          Enim illum sed impedit
                        </li>
                        <li className="pb-2">
                          2. Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Neque natus corporis odit, libero magni nulla
                          accusamus, consequuntur unde suscipit error nesciunt!
                          Enim illum sed impedit
                        </li>
                        <li className="pb-2">
                          2. Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Neque natus corporis odit, libero magni nulla
                          accusamus, consequuntur unde suscipit error nesciunt!
                          Enim illum sed impedit
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Okay, I understand
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const CheckOutForm = ({ user, address, lang }) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const [open, setOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [paymentDetails, setPaymentDetails] = useState({ paymentType: "card" });

  const [quantityStatus, setQuantityStatus] = useState(true);

  const { cartItems, setCartItems } = useCartItems();

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isAgreed) {
      toast.info("Please check the aggrement");
    }
    if (!quantityStatus) {
      toast.info("Please check the quantity");
    }

    if (paymentDetails?.payment != "ok") {
      toast.info("Please select a payment method");
    }

    if (cartItems?.length == 0) {
      toast.info("Please add item to the cart first");
    }

    if (
      cartItems?.length > 0 &&
      isAgreed &&
      quantityStatus &&
      paymentDetails?.payment == "ok"
    ) {
      try {
        setLoading(true);
        const formData = new FormData(event?.currentTarget);
        const res = await addOrder(user?.id, formData, paymentDetails);
        console.log(res);
        if (res?.status == 200) {
          setLoading(false);
          toast.success("Order placed successfully");
          router.refresh();
          router.push(`/${lang}/account`);
        }
      } catch (err) {
        toast.error(err?.message ?? err ?? "Something went wrong");
      }
    }
  };

  let billingStreetAddress, billingCity, billingCountry;
  let shippingStreetAddress, shippingCity, shippingCountry;
  if (address) {
    const shippingAddressArray = address?.shippingAddress?.split("+ ");
    const billingAddressArray = address?.billingAddress?.split("+ ");
    shippingStreetAddress = shippingAddressArray[0];
    shippingCity = shippingAddressArray[1];
    shippingCountry = shippingAddressArray[2];

    billingStreetAddress = billingAddressArray[0];
    billingCity = billingAddressArray[1];
    billingCountry = billingAddressArray[2];
  }

  useEffect(() => {
    let isQuantityValid = true;
    for (let i = 0; i < cartItems?.length; i++) {
      const cartItem = cartItems[i];
      if (cartItem?.quantity > cartItem?.product?.quantity) {
        isQuantityValid = false;
        break;
      }
    }
    setQuantityStatus(isQuantityValid);
  }, [cartItems]);

  return (
    <>
      <TermsAndCondition open={open} setOpen={setOpen} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="fname" className="text-gray-600">
              First Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              name="fname"
              id="fname"
              className="input-box"
              defaultValue={user?.name?.split(" ")[0]}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="lname" className="text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              name="lname"
              id="lname"
              className="input-box"
              defaultValue={user?.name?.split(" ")[1]}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-gray-600">
              Phone number
            </label>
            <span className="text-primary">*</span>
            <input
              type="text"
              name="phone"
              id="phone"
              className="input-box"
              defaultValue={user?.phone}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-gray-600">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="input-box"
              defaultValue={user?.email}
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-300 p-2 rounded-md">
            <p className="pb-2 text-center">Shipping Address</p>
            <div>
              <label htmlFor="shippingStreetAddress" className="text-gray-600">
                Street address
              </label>
              <input
                type="text"
                name="shippingStreetAddress"
                id="shippingStreetAddress"
                className="input-box"
                defaultValue={shippingStreetAddress}
                required
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="shippingCity" className="text-gray-600">
                City
              </label>
              <input
                type="text"
                name="shippingCity"
                id="shippingCity"
                className="input-box"
                defaultValue={shippingCity}
                required
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="shippingCountry" className="text-gray-600">
                Country/Region
              </label>
              <input
                type="text"
                name="shippingCountry"
                id="shippingCountry"
                className="input-box"
                defaultValue={shippingCountry}
                required
                disabled={loading}
              />
            </div>
          </div>
          <div className=" border border-gray-300 p-2 rounded-md">
            <p className="pb-2 text-center">Billing Address</p>
            <div>
              <label htmlFor="billingStreetAddress" className="text-gray-600">
                Street address
              </label>
              <input
                type="text"
                name="billingStreetAddress"
                id="billingStreetAddress"
                className="input-box"
                defaultValue={billingStreetAddress}
                required
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="billingCity" className="text-gray-600">
                City
              </label>
              <input
                type="text"
                name="billingCity"
                id="billingCity"
                className="input-box"
                defaultValue={billingCity}
                required
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="billingCountry" className="text-gray-600">
                Country/Region
              </label>
              <input
                type="text"
                name="billingCountry"
                id="billingCountry"
                className="input-box"
                defaultValue={billingCountry}
                required
                disabled={loading}
              />
            </div>
          </div>
        </div>
        <div className=" border border-gray-300 p-2 rounded-md">
          <PaymentModal
            paymentModalOpen={paymentModalOpen}
            setPaymentModalOpen={setPaymentModalOpen}
            paymentDetails={paymentDetails}
            setPaymentDetails={setPaymentDetails}
            loading={loading}
            setLoading={setLoading}
          />
        </div>

        <div className="flex items-center mb-4 mt-2">
          <input
            type="checkbox"
            name="aggrement"
            id="aggrement"
            className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
            required
            disabled={loading}
            onChange={(e) => {
              setIsAgreed(e.currentTarget.checked);
            }}
          />
          <label
            htmlFor="aggrement"
            className="text-gray-600 ml-3 cursor-pointer text-sm"
          >
            I agree to the{" "}
            <button onClick={() => setOpen(!open)} className="text-primary">
              terms & conditions
            </button>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`block w-full py-3 px-4 text-center text-white  transition font-medium rounded-md border border-primary ${
            isAgreed && quantityStatus
              ? "bg-primary cursor-pointer hover:bg-transparent hover:text-primary"
              : " bg-red-400"
          }`}
        >
          {loading ? <SpinnerLoader /> : "Place order"}
        </button>
      </form>
    </>
  );
};

export default CheckOutForm;
