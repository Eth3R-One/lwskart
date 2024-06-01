"use client";

import { updatePhone } from "@/app/actions";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { CgProfile } from "react-icons/cg";
import { MdDriveFileRenameOutline, MdEmail } from "react-icons/md";

import { toast } from "react-toastify";

const Form = ({ open, setOpen, user }) => {
  const cancelButtonRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const phone = formData.get("phone");
    const isChanged = phone != user?.phone;

    if (isChanged && phone != "") {
      try {
        const res = await updatePhone(user?.id, phone);
        if (res.message == "updated") {
          toast.success("Phone number updated");
        } else {
          toast.error(res?.message);
        }
      } catch (err) {
        toast.error(err?.message ?? err);
      }
    }
    if (!isChanged) {
      toast.info("Nothing changed!");
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
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CgProfile />
                  </div>
                  <div className="mt-3 sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-3xl text-center font-semibold leading-6 text-gray-900"
                    >
                      Update profile detials
                    </Dialog.Title>
                    <form className="mt-2" onSubmit={handleSubmit}>
                      <div>
                        <label
                          htmlFor="name"
                          className="block justify-start text-sm font-medium leading-6 text-gray-900"
                        >
                          Name
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                          <input
                            type="name"
                            name="name"
                            id="name"
                            defaultValue={user?.name}
                            disabled
                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-indigo-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block justify-start text-sm font-medium leading-6 text-gray-900"
                        >
                          Email
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            defaultValue={user?.email}
                            disabled
                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-indigo-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block justify-start text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                          <input
                            type="phone"
                            name="phone"
                            defaultValue={user?.phone}
                            id="phone"
                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="01*********"
                          />
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-indigo-600 hover:text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:col-start-2"
                          onClick={() => setOpen(false)}
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

const PersonalProfileForm = ({ dictionary, user }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="shadow rounded bg-white px-4 pt-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-800 text-lg">
            {dictionary.personalProfile}
          </h3>
          <button
            onClick={() => {
              setOpen(!open);
            }}
            className="text-primary"
          >
            {dictionary.edit}
          </button>
        </div>
        <div className="space-y-1">
          <div className="flex flex-row items-center gap-2">
            <MdDriveFileRenameOutline />

            <h4 className="text-gray-700 font-medium text-xl">{user?.name}</h4>
          </div>

          <div className="flex flex-row items-center gap-2">
            <MdEmail />

            <p className="text-gray-800">{user?.email}</p>
          </div>
          <p className="text-gray-800">{user?.phone}</p>
        </div>
      </div>
      <Form open={open} setOpen={setOpen} user={user} />
    </>
  );
};

export default PersonalProfileForm;
