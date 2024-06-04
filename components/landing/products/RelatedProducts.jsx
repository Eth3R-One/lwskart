import { getRelatedProducts } from "@/database/queries";
import ProductCard from "./ProductCard";

const RelatedProducts = async ({ product }) => {
  const products = await getRelatedProducts(product);
  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        Related products
      </h2>
      <div className="grid grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
