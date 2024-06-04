"use client";

import {
  useSearchParams,
  usePathname,
  useRouter,
  useParams,
} from "next/navigation";
import { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";

const SearchComponent = ({ dictionary }) => {
  const [query, setQuery] = useState("");
  const [q, setQ] = useState("");
  const { lang } = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      const decodedQuery = decodeURI(searchQuery).replace(/\+/g, " ");
      setQuery(decodedQuery);
      setQ(decodedQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("search", encodeURI(query.replace(/\s+/g, "+")));
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [query, pathname, router, searchParams]);

  const handleChange = (event) => {
    event.preventDefault();
    if (
      event.target.value == "" ||
      event.target.value == undefined ||
      event.target.value == null
    ) {
      setQuery("");
    }
    setQ(event.target.value);
  };

  const handleSearchClick = (event) => {
    event.preventDefault();
    const newQuery = q;
    setQuery(newQuery);

    const params = new URLSearchParams(searchParams);
    if (newQuery) {
      params.set("search", encodeURIComponent(newQuery.replace(/\s+/g, "+")));
    } else {
      params.delete("search");
    }

    router.push(`/${lang}/shop?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-xl relative flex px-1">
      <span className="absolute left-4 top-3 text-lg text-gray-400">
        <FaSearch />
      </span>
      <input
        type="search"
        name="search"
        id="search"
        className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
        placeholder={dictionary.search}
        value={q}
        onChange={handleChange}
      />
      <button
        className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex items-center"
        onClick={handleSearchClick}
      >
        {dictionary.search}
      </button>
    </div>
  );
};

export default SearchComponent;
