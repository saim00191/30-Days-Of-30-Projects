"use client";

import { useState } from "react";
import Image from "next/image";
import Image1 from "../images/image1.jpg";
import Image2 from "../images/image2.jpg";
import Image3 from "../images/image3.jpg";
import Image4 from "../images/image4.jpg";
import Image5 from "../images/image5.jpg";
export default function ImageSlider() {
  const images = [Image1, Image2, Image3, Image4, Image5];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="max-w-2xl mx-auto my-8">
      <h1 className="text-center py-6 text-4xl font-bold underline">Image Slider</h1>
      <div className="relative h-[500px] w-full">
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
        >
          &#10094;
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
        >
          &#10095;
        </button>
      </div>
      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full mx-1 cursor-pointer ${index === currentIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
            onClick={() => setCurrentIndex(index)}

          />
        ))}
      </div>
    </div>
  );
}
