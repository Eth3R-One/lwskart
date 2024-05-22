import ProductCard from "./ProductCard";

const ProductsList = ({ products, lang }) => {
  return (
    <div className="col-span-3">
      <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} lang={lang} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
