import React, { useState, useEffect } from 'react';
import slider1 from '../assets/images/slider-1.jpg';
import slider2 from '../assets/images/slider-2.jpg';
import slider3 from '../assets/images/slider-3.jpg';
import slider4 from '../assets/images/slider-4.jpg';

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to advance to the next slide
  const nextSlide = () => {
    // setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length); This also works but i prefer this

    setCurrentSlide((currentSlide) => {
        const nextSlide = currentSlide + 1;
        if (nextSlide >= slides.length) {
          return 0; // Wrap around to the first slide
        } else {
          return nextSlide;
        }
      });
  };

  // Auto-advance to the next slide after 5 seconds
  useEffect(() => {
    const timer = setTimeout(nextSlide, 10000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Array of slide images
  const slides = [slider1, slider2, slider3, slider4];

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }} //style={{ transform: translateX(-${currentSlide * 100}%) }}: This sets an inline style for the <div>.
        //   By multiplying currentSlide (the state value representing the current slide index) by -100, we calculate the appropriate percentage by which to translate the element.
        //   For example, if currentSlide is 0, the transform will be translateX(0%), indicating no horizontal translation (the first slide).
        //   If currentSlide is 1, the transform will be translateX(-100%), indicating a horizontal translation of 100% (the second slide).
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt="slider"
              className="w-[100%] md:h-[350px] h-[180px] md:object-cover"
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-4 h-4 rounded-full mx-1 transition-colors duration-300 ${
                index === currentSlide ? "bg-gray-800" : "bg-gray-300"
              }`}
              onClick={() => setCurrentSlide(index)} //set the currentSlide to the index ie the id of the slide element. This then will affect the transform property of te image div above, setting it ti 0, 1, 2, etc.
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};



export default ImageSlider

// <div className=" bg-white">
// {slides.map((_, index) => (
//   <button
//     key={index}
//     className={index === currentSlide ? "rounded-full bg-black active" : "round-button"}
//     onClick={() => setCurrentSlide(index)}
//   ></button>
// ))}
// </div>
