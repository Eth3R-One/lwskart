import { getProducts } from "@/database/queries";
import ProductCard from "./ProductCard";

const ProductsList = async ({ lang, products, selectedCategory }) => {
  const categories = selectedCategory ? selectedCategory.split("+") : [];

  return (
    <div className="col-span-3">
      <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
        {products
          ?.filter((product) => {
            if (!selectedCategory) {
              return true;
            }
            return categories.includes(product?.category);
          })
          .map((product) => (
            <ProductCard key={product.id} lang={lang} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductsList;
