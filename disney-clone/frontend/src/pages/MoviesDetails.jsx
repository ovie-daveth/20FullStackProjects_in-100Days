import React from 'react'
import { useParams } from 'react-router-dom'
import { movies } from '../FetchDataFromAPI'
import vid1 from "../assets/videos/marvel.mp4"

const MoviesDetails = () => {
    const {movieId} = useParams()
    console.log("Movie id", movieId)
    
  return (
    <div className='text-white mt-16'>
      {
        movies.map((m) => m.id.toString() === movieId && (
           <div className="relative">
            <div className="flex m-auto items-center w-[90%] h-[80vh] gap-5 ">
                <div className="block border-[2px] border-gray-500 w-[25%]">
                    <img src={m.cardImg} alt={m.subTitle} />
                    <div className="flex flex-col gap-3">
                        <p>{m.title}</p>
                        <p>{m.subTitle}</p>
                        <small>{m.description}</small>
                        <div className="flex">
                            <p>{m.type}</p>
                        </div>
                    </div>
                </div>
                <video autoPlay loop className='w-[60%]'>
                    <source src={vid1} type="video/mp4" />
                </video>
            </div>
               
                
                <img src={m.backgroundImg} alt={m.title} className='absolute top-0 -z-10 opacity-30' />
           </div>
        ))
      }
    </div>
  )
}

export default MoviesDetails
