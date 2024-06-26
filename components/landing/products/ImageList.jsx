"use client";
import Image from "next/image";
import { useState } from "react";

const ImageList = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const totalImage = images?.length - 1;

  const handleImageChange = (index) => {
    setSelectedImage(index);
  };

  const handleImageDecrease = () => {
    setSelectedImage((prev) => {
      if (prev == 0) return totalImage;
      else return prev - 1;
    });
  };

  const handleImageIncrease = () => {
    setSelectedImage((prev) => {
      if (prev == totalImage) return 0;
      else return prev + 1;
    });
  };
  return (
    <div>
      <div className="rounded-lg">
        <Image
          height={1280}
          width={1280}
          src={images[selectedImage]}
          alt={title}
          className="w-full rounded-lg"
        />
        <div className="flex justify-between p-1">
          <button
            type="button"
            onClick={handleImageDecrease}
            className="flex justify-start cursor-pointer group focus:outline-none"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            onClick={handleImageIncrease}
            className=" flex justify-end cursor-pointer group focus:outline-none"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 mt-4">
        {images?.map((img, ind) => (
          <Image
            key={ind}
            height={1280}
            width={1280}
            src={img}
            alt={title}
            className={`w-full cursor-pointer border hover:border-red-400 rounded-md ${
              ind == selectedImage && "border-red-500"
            }`}
            onClick={() => setSelectedImage(ind)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageList;
