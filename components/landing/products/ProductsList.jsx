import ProductCard from "./ProductCard";

const ProductsList = () => {
  return (
    <div className="col-span-3">
      <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
        <ProductCard />
      </div>
    </div>
  );
};

export default ProductsList;