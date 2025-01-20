"use client";

import React, { useEffect, useRef, useState } from "react";
import KeenSlider, { KeenSliderInstance } from "keen-slider";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

const Carousel = () => {
  const images = [
    { src: '/storeImg1.png', alt: 'Slide 1' },
    { src: '/storeImg2.png', alt: 'Slide 2' },
    { src: '/storeImg3.png', alt: 'Slide 3' },
  ];

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const keenSliderInstance = useRef<KeenSliderInstance | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (sliderRef.current) {
      keenSliderInstance.current = new KeenSlider(sliderRef.current, {
        loop: true,
        slides: {
          perView: 1,
          spacing: 16,
        },
        breakpoints: {
          "(min-width: 768px)": {
            slides: {
              perView: 1,
              spacing: 24,
            },
          },
        },
        slideChanged(s) {
          setCurrentSlide(s.track.details.rel);
        },
      });

      return () => {
        keenSliderInstance.current?.destroy();
      };
    }
  }, []);

  const handlePrev = () => keenSliderInstance.current?.prev();
  const handleNext = () => keenSliderInstance.current?.next();

  return (
    <>
      <div className="relative w-full max-w-3xl mx-auto mt-5">
        <div
          ref={sliderRef}
          className="keen-slider overflow-hidden rounded-lg relative"
        >
          {images.map((image, index) => (
            <div key={index} className="keen-slider__slide cursor-grab">
              <div className="relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={400}
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          ❮
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          ❯
        </button>

        <div className="flex justify-center mt-4">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => keenSliderInstance.current?.moveToIdx(idx)}
              className={`w-3 h-3 rounded-full mx-1 ${
                currentSlide === idx ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Carousel;
