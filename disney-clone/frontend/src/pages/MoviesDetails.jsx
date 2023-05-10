import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import vid1 from "../assets/videos/marvel.mp4"
import { getPopularMovies, getTrendingMovies, getNewMovies, getOriginalMovies } from '../FetchDataFromAPI';


const MoviesDetails = () => {
    const {movieId} = useParams()
    console.log("Movie id", movieId)
    const [movie, setMovie] = useState([]);
    console.log("Movie set", movie)

    useEffect(() => {
      const fetchMovieDetails = async () => {
        try {
          const moviesData = await getPopularMovies();
          const selectedMovie = moviesData.map((m) => m.id !== movieId);
          setMovie(selectedMovie);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      };
  
      fetchMovieDetails();
    }, [movieId]);
    //backdrop_path
  const imagepath = movie.map(image => image.poster_path)
  const getImageUrl = (index) => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${imagepath[index]}`;
  };
  console.log(`Image URL: ${getImageUrl()}`);
  
  console.log(`Image URL: ${getImageUrl()}`)
  return (
    <div className='text-white mt-16'>
      {movie && (
        <div className="relative">
          <div className="flex m-auto items-center w-[90%] h-[80vh] gap-5 ">
            <div className="block border-[2px] border-gray-500 w-[25%]">
              <img src={getImageUrl(movie.id)} alt={movie.subTitle} />
              <div className="flex flex-col gap-3">
                <p className='text-white'>{movie.title}</p>
                <p>{movie.subTitle}</p>
                <small>{movie.description}</small>
                <div className="flex">
                  <p>{movie.type}</p>
                </div>
              </div>
            </div>
            <video autoPlay loop className='w-[60%]'>
              <source src={vid1} type="video/mp4" />
            </video>
          </div>
          <img src={movie.backgroundImg} alt={movie.title} className='absolute top-0 -z-10 opacity-30' />
        </div>
      )}
    </div>
  );
}

export default MoviesDetails
