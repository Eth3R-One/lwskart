import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import CardPayment from "./CardPayment";
import Image from "next/image";

import { FaCheck, FaCheckCircle } from "react-icons/fa";

const PaymentModal = ({
  paymentModalOpen,
  setPaymentModalOpen,
  setPaymentDetails,
  loading,
  setLoading,
  paymentDetails,
}) => {
  const [payment, setPayment] = useState("card");
  return (
    <>
      <div className="col-span-8">
        <h1 className="text-lg font-medium text-center rounded-md bg-gray-300 py-2 pl-3">
          Select Payment Method
        </h1>
        {paymentDetails?.payment != "ok" ? (
          <>
            <div className="flex items-center justify-center mt-5 gap-5">
              <div
                onClick={() => {
                  setPaymentDetails((prevDetails) => ({
                    ...prevDetails,
                    paymentType: "cash",
                  }));

                  setPayment("card");
                }}
                className={`flex justify-center flex-col cursor-pointer rounded-md items-center p-2 border-2  ${
                  payment == "card"
                    ? "border border-primary scale-110"
                    : "border-gray-200"
                }`}
              >
                <Image
                  height={24}
                  width={24}
                  src="/assets/images/credit-card.png"
                  alt="card"
                />
                <h1
                  className={`mt-1 ${payment == "card" ? "text-primary " : ""}`}
                >
                  {" "}
                  Credit Card
                </h1>
              </div>

              <div
                onClick={() => {
                  setPaymentDetails((prevDetails) => ({
                    ...prevDetails,
                    paymentType: "cash",
                  }));
                  setPayment("cash");
                }}
                className={`flex justify-center flex-col cursor-pointer rounded-md items-center p-2 border-2 ${
                  payment == "cash"
                    ? "border border-primary scale-110"
                    : "border-gray-200"
                }`}
              >
                <Image
                  height={24}
                  width={24}
                  src="/assets/images/cash-on.png"
                  alt="cash"
                />
                <h1
                  className={`mt-1 ${payment == "cash" ? "text-primary" : ""}`}
                >
                  Cash on Delivery
                </h1>
              </div>
            </div>
            {payment === "card" && (
              <CardPayment
                paymentModalOpen={paymentModalOpen}
                setPaymentModalOpen={setPaymentModalOpen}
                paymentDetails={paymentDetails}
                setPaymentDetails={setPaymentDetails}
                loading={loading}
                setLoading={setLoading}
              />
            )}
            {payment == "cash" && (
              <div className="p-5 flex flex-col items-center justify-center">
                <p>Payment on cash available</p>
                <span>
                  <FaCheck size={50} className="text-green-500" />
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    setPaymentDetails((prevDetails) => ({
                      ...prevDetails,
                      payment: "ok",
                    }));
                  }}
                  className="px-5 py-1 bg-primary items-center justify-center rounded-lg text-white cursor-pointer pt-2"
                >
                  Select Cash On Delivary
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-row items-center justify-center py-5">
            <span className="items-center justify-center">
              <FaCheckCircle size={100} className="text-green-500" />
            </span>
          </div>
        )}
      </div>
    </>
  );
};
export default PaymentModal;
