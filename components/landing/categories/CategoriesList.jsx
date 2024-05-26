import { getCategories } from "@/database/queries";
import CategoryCard from "./CategoryCard";

const CategoriesList = async ({ dictionary }) => {
  const categories = await getCategories();
  return (
    <div className="container py-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        {dictionary?.shopByCategory}
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {categories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
