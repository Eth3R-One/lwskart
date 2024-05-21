import ProductCard from "./ProductCard";

const TopNewArrivalSection = ({ dictionary }) => {
  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        {dictionary.topNewArrival}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ProductCard />
      </div>
    </div>
  );
};

export default TopNewArrivalSection;
