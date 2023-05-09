import React, { useState } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import {Link} from 'react-router-dom'

const Recommends = ({ videoclass, movie }) => {
  
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(movie.length / 4);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  return (
    <div className="block px-3 mt-12">
      <p className="mb-5">{videoclass}</p>

      <div className="relative overflow-hidden flex items-center">
        <div className="block slider-icon absolute left-0 z-10" onClick={handlePrevPage}>
          <FiChevronLeft />
        </div>
        <div className="slider-wrapper">
          <div className="slider-content " style={{ transform: `translateX(-${currentPage * 100}%)` }}>
            {movie.map((item, index) => (
              <Link to={`/movie/${index}`}
                key={index}
                className="slider-item bg-red-500 rounded-lg border-[2.3px] border-gray-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
        <div className="block slider-icon  absolute right-1" onClick={handleNextPage}>
          <FiChevronRight />
        </div>
      </div>
    </div>
  );
};

export default Recommends;
