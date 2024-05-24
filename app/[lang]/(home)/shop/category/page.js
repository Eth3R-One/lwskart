import CategoriesList from "@/components/landing/categories/CategoriesList";
import { getCategories } from "@/database/queries";
import { getDictionary } from "../../dictionaries";

const CategoryPage = async ({ params: { lang } }) => {
  const categories = await getCategories();
  const dictionary = await getDictionary(lang);
  return (
    <div>
      <CategoriesList dictionary={dictionary} categories={categories} />
    </div>
  );
};

export default CategoryPage;
