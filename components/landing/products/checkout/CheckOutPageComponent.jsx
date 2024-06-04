import CheckOutForm from "@/components/landing/products/checkout/CheckOutForm";
import OrderSummary from "./OrderSummary";

const CheckOutPageComponent = ({ user, address, lang }) => {
  return (
    <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-2">
      {/*  */}
      <div className="col-span-8 border border-gray-200 p-4 rounded">
        <h3 className="text-lg font-medium capitalize mb-4">Checkout</h3>
        <CheckOutForm user={user} address={address} lang={lang} />
      </div>
      {/*  */}
      <OrderSummary user={user} />
    </div>
  );
};

export default CheckOutPageComponent;
