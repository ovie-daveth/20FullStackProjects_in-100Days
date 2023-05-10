import React, { useEffect, useState } from 'react'
import homebg from "../assets/images/home-background.png"
import ImageSlider from '../components/ImageSlider'
import Viewers from '../components/Viewers';
import Recommends from '../components/Recommends';
import { getPopularMovies, getTrendingMovies, getNewMovies, getOriginalMovies } from '../FetchDataFromAPI';

const Home = () => {
  const [popularmovies, setPopularMovies] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  const [newMovies, setNewMovies] = useState([])
  const [originalMovies, setOriginalMovies] = useState([])


  //While i was using the static data

  // const popularurl = "https://api.themoviedb.org/3/movie/popular?api_key=05fae875ba825af281bcb0a5583071e1&append_to_response=videos,images"
  // const trendingurl = "https://api.themoviedb.org/3/movie/top_rated?api_key=05fae875ba825af281bcb0a5583071e1&append_to_response=videos,images"
  // const newurl = "https://api.themoviedb.org/3/movie/now_playing?api_key=05fae875ba825af281bcb0a5583071e1&append_to_response=videos,images"
  // const originalurl = "https://api.themoviedb.org/3/movie/upcoming?api_key=05fae875ba825af281bcb0a5583071e1&append_to_response=videos,images";


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularMoviesData = await getPopularMovies();
        setPopularMovies(popularMoviesData);

        const trendingMoviesData = await getTrendingMovies();
        setTrendingMovies(trendingMoviesData);

        const newMoviesData = await getNewMovies();
        setNewMovies(newMoviesData);

        const originalMoviesData = await getOriginalMovies();
        setOriginalMovies(originalMoviesData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);
  
  // const newMovies = movies.filter(movie => movie.type === 'new');
  // const recommendMovies = movies.filter(movie => movie.type === 'recommend');
  // const trendingMovies = movies.filter(movie => movie.type === 'trending');
  // const originalMovies = movies.filter(movie => movie.type === 'original');

  return (
    <div className="mt-16 overflow-hidden">
      <ImageSlider />
      <Viewers />
      <Recommends videoclass="Recommended for you" movie={popularmovies} />
      <Recommends videoclass="New to Disney+" movie={newMovies} />
      <Recommends videoclass="Trending" movie={trendingMovies} />
      <Recommends videoclass="Upcoming Movies" movie={originalMovies} />
      <div className="-z-10 absolute top-16">
        <img src={homebg} alt="bg" className="w-[100vw] h-screen" />
      </div>
    </div>
  );
}

export default Home
