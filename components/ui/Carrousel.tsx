import React, { useState } from "react";
import Image from "next/image";
import arrowLeft from "../../components/ui/assets/icons/arrowLeft.svg";
import arrowRight from "../../components/ui/assets/icons/arrowRight.svg";

type CarrouselProps = {
  content?: React.ReactNode[];
};

const Carrousel: React.FC<CarrouselProps> = ({ content }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!content) {
    return null;
  }

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % content.length);
  };

  const previousSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + content.length) % content.length,
    );
  };

  return (
    <div className="relative h-full">
      {content?.map((slide, index) => (
        <div
          key={index}
          className={`absolute h-full w-full transition-opacity duration-300 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {slide}
        </div>
      ))}

      <div className="relative h-full inset-0 z-[-1]">
        {content[currentSlide]}
      </div>

      <div className="absolute left-0 bottom-0 top-0 flex items-center justify-start">
        <button className="overflow-hidden" onClick={previousSlide}>
          <Image
            className="transition-transform hover:scale-150"
            src={arrowLeft}
            alt="previous"
            width={50}
            height={50}
          />
        </button>
      </div>

      <div className="absolute right-0 top-0 bottom-0 flex items-center justify-end">
        <button className="overflow-hidden" onClick={nextSlide}>
          <Image
            className="overflow-hidden transition-transform hover:scale-150"
            width={50}
            height={50}
            src={arrowRight}
            alt="next"
          />
        </button>
      </div>

      <div className="absolute bottom-4 flex justify-center items-center w-full rounded-full">
        <div className="h-2 flex rounded-full bg-gray-400 overflow-hidden">
          {content?.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
              }}
              className={`h-full w-10 ${
                index === currentSlide ? "bg-white" : ""
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carrousel;
