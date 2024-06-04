import { getTrendingProducts } from "@/database/queries";
import ProductCard from "./ProductCard";

const TrendingProducts = async ({ dictionary }) => {
  const products = await getTrendingProducts();
  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        {dictionary.trending}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
