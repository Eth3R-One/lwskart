import { toast } from "react-toastify";

const CardPayment = ({
  paymentModalOpen,
  setPaymentModalOpen,
  paymentDetails,
  setPaymentDetails,
  loading,
  setLoading,
}) => {
  return (
    <div className="shadow-xl">
      <div className=" mt-10 pb-8 px-10 py-5 border rounded-lg ">
        <div>
          <label htmlFor="cardNumber">
            Card Number <span className="text-primary">*</span>
          </label>

          <input
            className="w-full mt-1 focus:outline-none rounded-l-sm py-2 px-2 border-2 border-gray-200"
            type="number"
            name="cardNumber"
            placeholder="type card number"
            required
            min={1}
            id="cardNumber"
            defaultValue={paymentDetails?.cardNumber}
            onChange={(e) => {
              setPaymentDetails((prevDetails) => {
                return { ...prevDetails, cardNumber: e.target?.value };
              });
            }}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="nameOnCard">
            Name on Card <span className="text-primary">*</span>
          </label>
          <br />
          <input
            className="w-full mt-1 focus:outline-none rounded-l-sm py-2 px-2 border-2 border-gray-200"
            type="text"
            name="nameOnCard"
            placeholder="type name on card"
            required
            id="nameOnCard"
            defaultValue={paymentDetails?.nameOnCard}
            onChange={(e) => {
              setPaymentDetails((prevDetails) => {
                return { ...prevDetails, nameOnCard: e.target?.value };
              });
            }}
          />
        </div>
        <div className="md:flex">
          <div className="w-full mt-4">
            <label htmlFor="expireDate">
              Expiration Date <span className="text-primary">*</span>
            </label>{" "}
            <br />
            <input
              className="w-full mt-1 focus:outline-none rounded-l-sm py-2 px-2 border-2 border-gray-200"
              type="date"
              name="expireDate"
              placeholder="Expiration Date"
              required
              id="expireDate"
              defaultValue={paymentDetails?.expireDate}
              onChange={(e) => {
                setPaymentDetails((prevDetails) => {
                  return { ...prevDetails, expireDate: e.target?.value };
                });
              }}
            />
          </div>
          <div className="w-full md:ml-4 mt-4">
            <label htmlFor="cvv">
              CVV <span className="text-primary">*</span>
            </label>
            <br />
            <input
              className="w-full mt-1 focus:outline-none rounded-l-sm py-2 px-2 border-2 border-gray-200"
              type="number"
              name="cvv"
              placeholder="type CVV"
              id="cvv"
              required
              min={1}
              defaultValue={paymentDetails?.cvv}
              onChange={(e) => {
                setPaymentDetails((prevDetails) => ({
                  ...prevDetails,
                  cvv: e.target?.value,
                }));
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            if (
              paymentDetails?.cardNumber == "" ||
              paymentDetails?.nameOnCard == "" ||
              paymentDetails?.expireDate == "" ||
              paymentDetails?.cvv == "" ||
              paymentDetails?.cardNumber == undefined ||
              paymentDetails?.nameOnCard == undefined ||
              paymentDetails?.expireDate == undefined ||
              paymentDetails?.cvv == undefined
            ) {
              toast.error("Enter card details");
            } else {
              setPaymentDetails((prevDetails) => ({
                ...prevDetails,
                payment: "ok",
              }));
            }
          }}
          className="px-5 py-1 bg-primary items-center justify-center rounded-lg text-white cursor-pointer pt-2"
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default CardPayment;
