"use client";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { toast } from "react-toastify";
import { updateAddress } from "@/app/actions";

import { MdLocalShipping } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const Form = ({ open, setOpen, user, address }) => {
  const cancelButtonRef = useRef(null);

  const fullAddress = address?.shippingAddress?.split("+ ");

  let location, city, country;
  if (fullAddress) {
    location = fullAddress[0];
    city = fullAddress[1];
    country = fullAddress[2];
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const location = formData.get("location");
    const city = formData.get("city");
    const country = formData.get("country");
    const updatedLocation =
      location.toString() + "+ " + city.toString() + "+ " + country.toString();

    const isChanged = address?.shippingAddress != updatedLocation;
    if (isChanged) {
      try {
        const res = await updateAddress(user?.id, {
          type: "shipping",
          address: updatedLocation,
        });

        if (res?.status == 200) {
          toast.success("Shipping address updated");
          setOpen(false);
        } else {
          toast.error(res?.message);
        }
      } catch (err) {
        toast.error(err?.message ?? err);
      }
    }
    if (!isChanged) {
      toast.info("Nothing changed!");
      setOpen(false);
    }
  };
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
                  <div className="mx-auto flex h-12 w-12 items-center justify-center border border-black rounded-full ">
                    <MdLocalShipping />
                  </div>
                  <div className="mt-3 sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className=" text-3xl font-semibold leading-6 text-center text-indigo-900"
                    >
                      Update shipping address
                    </Dialog.Title>
                    <form className="mt-2" onSubmit={handleSubmit}>
                      <div>
                        <label
                          htmlFor="location"
                          className="block justify-start text-xl pt-2 font-medium leading-6 text-gray-900"
                        >
                          Address
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                          <input
                            type="location"
                            name="location"
                            id="location"
                            defaultValue={location}
                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                            placeholder="Enter your house no, road no, area name . . ."
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="city"
                          className="block justify-start text-xl pt-2 font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                          <input
                            type="city"
                            name="city"
                            id="city"
                            defaultValue={city}
                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                            placeholder="Enter your city name . . ."
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="country"
                          className="block justify-start text-xl pt-2 font-medium leading-6 text-gray-900"
                        >
                          Country
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                          <input
                            type="country"
                            name="country"
                            id="country"
                            defaultValue={country}
                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                            placeholder="Enter your country name . . ."
                            required
                          />
                        </div>
                      </div>

                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-indigo-600 hover:text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:col-start-2"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                          onClick={() => setOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const ShippingAddressForm = ({ dictionary, user, address }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="shadow rounded bg-white px-4 pt-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-800 text-lg">
            {dictionary.shipAddress}
          </h3>
          <button onClick={() => setOpen(true)} className="text-primary">
            {dictionary.edit}
          </button>
        </div>
        <div className="space-y-1 py-2">
          <div className="flex flex-row gap-3 border p-2 rounded-lg items-center py-2">
            <MdLocalShipping size={25} />
            {address ? (
              <p className="text-gray-800">
                {address?.shippingAddress?.split("+")?.join(", ")}
              </p>
            ) : (
              <p className="text-red-400">You have no address added</p>
            )}
          </div>
        </div>
      </div>
      <Form open={open} setOpen={setOpen} user={user} address={address} />
    </>
  );
};

export default ShippingAddressForm;
