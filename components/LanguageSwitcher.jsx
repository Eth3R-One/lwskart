"use client";

import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    {
      code: "en",
      language: "English",
    },
    {
      code: "bn",
      language: "Bangla",
    },
  ];

  const found = languages.find((lang) => pathname.includes(lang.code));
  const [selectedLanguage, setSelectedLanguage] = useState(
    found ? found.code : languages[0].code
  );
  const [showManu, setShowManu] = useState(false);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setShowManu(false);
    let updatedPath = pathname;
    if (pathname?.includes(selectedLanguage)) {
      updatedPath = pathname.replace(selectedLanguage, lang);
    }
    // location.replace(updatedPath);
    router.push(updatedPath);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2"
        onClick={() => setShowManu(!showManu)}
      >
        <Image
          className="max-w-8"
          src={`/${selectedLanguage}.png`}
          alt="bangla"
          height={700}
          width={700}
        />
        {selectedLanguage.language}
      </button>
      {showManu && (
        <div className="absolute right-0 top-full mt-2 w-40 rounded-md  p-2 z-10 shadow-lg">
          <ul>
            {languages.map((entry) => (
              <li
                key={entry.code}
                onClick={() => handleLanguageChange(entry.code)}
                className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-500"
              >
                <Image
                  className="max-w-8"
                  src={`/${entry.code}.png`}
                  alt="bangla"
                  height={100}
                  width={165}
                />
                {entry.language}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
