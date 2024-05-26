import CategoriesList from "@/components/landing/categories/CategoriesList";
import { getDictionary } from "../../dictionaries";

const CategoryPage = async ({ params: { lang } }) => {
  const dictionary = await getDictionary(lang);
  return (
    <div>
      <CategoriesList dictionary={dictionary} />
    </div>
  );
};

export default CategoryPage;
