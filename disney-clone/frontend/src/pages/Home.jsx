import React, { useEffect, useState } from 'react'
import homebg from "../assets/images/home-background.png"
import ImageSlider from '../components/ImageSlider'
import Viewers from '../components/Viewers';
import Recommends from '../components/Recommends';
import { movies } from '../FetchDataFromAPI';
import axios from 'axios';

const Home = () => {
  const [popularmovies, setPopularMovies] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  const [newMovies, setNewMovies] = useState([])
  const [originalMovies, setOriginalMovies] = useState([])

  const popularurl = "https://api.themoviedb.org/3/movie/popular?api_key=05fae875ba825af281bcb0a5583071e1&append_to_response=videos,images"
  const trendingurl = "https://api.themoviedb.org/3/movie/top_rated?api_key=05fae875ba825af281bcb0a5583071e1&append_to_response=videos,images"
  const newurl = "https://api.themoviedb.org/3/movie/now_playing?api_key=05fae875ba825af281bcb0a5583071e1&append_to_response=videos,images"
  const originalurl = "https://api.themoviedb.org/3/movie/upcoming?api_key=05fae875ba825af281bcb0a5583071e1&append_to_response=videos,images";

  useEffect(()=>{
    const getPopularMovie = async () =>{
      axios.get(popularurl).then(response => {
        console.log(response.data.results)
        setPopularMovies(response.data.results)
      }).catch((err) => {
        console.log("error message", err)
      })
    }
    const getTrendingMovies = ()=> {
      axios.get(trendingurl).then(response => {
        console.log(response.data.results)
        setTrendingMovies(response.data.results)
      }).catch((err) => {
        console.log("error message", err)
      })
    }
    const getNewMovies = ()=> {
      axios.get(newurl).then(response => {
        console.log(response.data.results)
        setNewMovies(response.data.results)
      }).catch((err) => {
        console.log("error message", err)
      })
    }
    const getOrignalMovies = ()=> {
      axios.get(originalurl).then(response => {
        console.log(response.data.results)
        setOriginalMovies(response.data.results)
      }).catch((err) => {
        console.log("error message", err)
      })
    }
    getPopularMovie()
    getTrendingMovies()
    getNewMovies()
    getOrignalMovies()
  }, [])
  
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
