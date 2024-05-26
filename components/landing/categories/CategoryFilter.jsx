"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryFilter = ({ categories }) => {
  const [query, setQuery] = useState([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);

  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const checked = event.target.checked;

    if (checked) {
      setQuery((prev) => [...prev, name]);
    } else {
      const updatedQuery = query.filter((item) => item !== name);
      setQuery(updatedQuery);
    }
  };

  useEffect(() => {
    const category = params.get("category");
    if (category) {
      const decodedCategory = decodeURI(category);
      const queryInCategory = decodedCategory.split("+");
      setQuery(queryInCategory);
    }
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      params.set("category", encodeURI(query.join("+")));
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [query]);

  return (
    <div className="space-y-2">
      {categories?.map((category) => (
        <div key={category.id} className="flex items-center">
          <input
            type="checkbox"
            name={category?.name}
            id={category?.name}
            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
            onChange={handleChange}
            checked={query.includes(category?.name)}
          />
          <label
            htmlFor={category?.name}
            className="text-gray-600 ml-3 cusror-pointer"
          >
            {category?.name}
          </label>
          {/* <div className="ml-auto text-gray-600 text-sm">(15)</div> */}
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
