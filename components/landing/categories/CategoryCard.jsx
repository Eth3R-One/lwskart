import CustomLink from "@/components/CustomLink";
import Image from "next/image";

const CategoryCard = ({ category }) => {
  return (
    <div className="relative rounded-md overflow-hidden group">
      <Image
        src={category.thumbnail}
        alt={category.name}
        width={1080}
        height={1080}
        className="w-full"
      />
      <CustomLink
        href={`shop`}
        searchParams={{ category: category?.name }}
        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
      >
        {`${category?.name?.charAt(0)?.toUpperCase()}${category?.name?.slice(
          1
        )}`}
      </CustomLink>
    </div>
  );
};

export default CategoryCard;
