import Image from "next/image";

const FeaturesSection = ({ dictionary }) => {
  return (
    <div className="container py-16">
      <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
        <div className="border border-primary rounded-md px-3 py-6 flex justify-center items-center gap-5 hover:scale-105 hover:cursor-default">
          <Image
            height={12}
            width={12}
            src="/assets/images/icons/delivery-van.svg"
            alt="Delivery"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h4 className="font-medium capitalize text-lg">
              {dictionary.freeShipping}
            </h4>
            <p className="text-gray-500 text-sm">
              {dictionary.freeShippingText}
            </p>
          </div>
        </div>
        <div className="border border-primary rounded-md px-3 py-6 flex justify-center items-center gap-5 hover:scale-105 hover:cursor-default">
          <Image
            height={12}
            width={12}
            src="/assets/images/icons/money-back.svg"
            alt="Delivery"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h4 className="font-medium capitalize text-lg">
              {dictionary.moneyReturn}
            </h4>
            <p className="text-gray-500 text-sm">
              {dictionary.moneyReturnText}
            </p>
          </div>
        </div>
        <div className="border border-primary rounded-md px-3 py-6 flex justify-center items-center gap-5 hover:scale-105 hover:cursor-default">
          <Image
            height={12}
            width={12}
            src="/assets/images/icons/service-hours.svg"
            alt="Delivery"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h4 className="font-medium capitalize text-lg">
              {dictionary.support}
            </h4>
            <p className="text-gray-500 text-sm">{dictionary.supportText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
