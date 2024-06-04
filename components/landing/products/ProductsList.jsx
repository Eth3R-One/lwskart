import { getProducts } from "@/database/queries";
import ProductCard from "./ProductCard";

const ProductsList = async ({
  lang,
  products,
  selectedCategory,
  searchQuery,
}) => {
  const categories = selectedCategory ? selectedCategory.split("+") : [];

  const filteredProducts = products?.filter((product) => {
    const matchesCategory =
      !selectedCategory || categories.includes(product.category);
    const matchesSearchQuery =
      !searchQuery ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearchQuery;
  });

  return (
    <div className="col-span-3">
      <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} lang={lang} product={product} />
        ))}
        {(!filteredProducts || filteredProducts.length == 0) && (
          <div className="col-span-3">
            <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
              <div className="col-span-3 items-center text-center justify-center">
                <div className="h-auto w-auto">No products found</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
