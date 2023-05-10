import React, { useState } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getDetails } from '../states/reducers/movieSlice';

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
  //imgUrl: '', desc: '', subtitle: '', title: '', date: '', isAdut: false, genre: '', views: 0
  const moviepath = movie.map(movie => ({
    title: movie.title,
    date: movie.release_date,
    view: movie.vote_count,
    imgUrl: `https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`,
    isadult: movie.adult,
    desc: movie.overview,
    bg: `https://www.themoviedb.org/t/p/w220_and_h330_face${movie.backdrop_path}`,
    vote: movie.vote_average,
    language: movie.original_language,
    liked: false,
  }));
  
  const getmovieDetail = (index) => {
    return moviepath[index];
  };
  
  console.log(`Movie PATH:`, getmovieDetail());
  
  const nav = useNavigate()
  
  const dispatch = useDispatch()

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
              <div
              onClick={() => {
                dispatch(getDetails(getmovieDetail(index)))
                nav(`/movies/${item.id}`)
              }}
                key={item.id}
                className="slider-item rounded-lg border-[2.3px] border-gray-500 hover:scale-x-105 transition-transform duration-500"
              >
                <img src={getImageUrl(index)} alt="" className='w-full h-full' />
              </div>
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
