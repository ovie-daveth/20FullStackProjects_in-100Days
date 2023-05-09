import React, { useState } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import {Link} from 'react-router-dom'

const Recommends = ({ videoclass, movie }) => {
  
  const [currentPage, setCurrentPage] = useState(0);
  console.log(movie)
  const totalPages = Math.ceil(movie.length / 4);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };
  const imagepath = movie.map(image => image.poster_path)
  const getImageUrl = (index) => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${imagepath[index]}`;
  };
  
  console.log(`Image URL: ${getImageUrl()}`)

  return (
    <div className="block px-3 mt-12">
      <p className="mb-5">{videoclass}</p>

      <div className="relative overflow-hidden flex items-center">
        <div className="block slider-icon absolute left-0 z-10" onClick={handlePrevPage}>
          <FiChevronLeft />
        </div>
        <div className="slider-wrapper">
          <div className="slider-content gap-5 " style={{ transform: `translateX(-${currentPage * 100}%)` }}>
            {movie.map((item, index) => (
              <Link to={`/movies/${item.id}`}
                key={item.id}
                className="slider-item rounded-lg border-[2.3px] border-gray-500 hover:scale-x-105 transition-transform duration-500"
              >
                <img src={getImageUrl(index)} alt="" className='w-full h-full' />
                <p>{item.title}</p>
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
