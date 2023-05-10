import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AiFillAlipayCircle } from 'react-icons/ai';
import {BsFillHeartFill, BsPlayCircleFill} from 'react-icons/bs'
import {FaTimes} from 'react-icons/fa'
import { returnDetail } from '../states/reducers/movieSlice';
import vid from '../assets/videos/star-wars.mp4'


const MoviesDetails = () => {

  const { imgUrl, desc, title, date, isAdult, view, bg, vote, language, liked } = useSelector((state) => state.movie.value)
    const [like, setLike] = useState(liked);
    const [showVid, setShowVid] = useState(false);

  localStorage.setItem("like", like)
  const dispatch = useDispatch()
    const containerStyle = {
      backgroundImage: `url(${bg})`,
      backgroundSize: '100% 100%',
      backgroundPosition: 'center'
    };

  return (
    <div className='text-white relative w-full h-screen' style={containerStyle}>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" onClick={()=> setShowVid(false)}></div>
       <div className="flex flex-col md:flex-row md:w-[80%] w-[95%] m-auto pt-32 justify-between items-center before:absolute relative before:bg-blue-200 before:left-0 before:w-full before:top-0 before:h-full before:opacity-20 px-3 py-3 pl-8">
          <div className="block md:w-[27%] w-[100%] h-[100%] z-10 bg-blue-700 rounded">
                <img src={imgUrl} alt={title} className='w-full rounded-t-lg ' />
                <div className="text-center py-4 flex items-center justify-center gap-3">
                  <p className='text-3xl'><AiFillAlipayCircle /></p>
                  <p>{vote <= 3 ? "Trending Now" : vote >= 5  ? "Now Streaming" : vote >= 8 ? "Newly Uploaded" : "Blockbuster"}</p>
                </div>
            </div>
            <div className="flex flex-col z-10 md:w-[65%] w-[100%] py-4 md:py-0">
              <h2 className='lg:text-3xl mb:text-xl text-xl text-center md:text-left font-bold mb-6 md:mb-2 lg:mb-0'>{title} ({language})</h2>
              <div className='flex items-center gap-3'>
                <p className='flex items-center gap-1 after:absolute relative after:bg-white after:top-0 after:h-full after:right-0 after:w-[2px] pr-3'> <span className='border-[1px] border-white rounded-sm px-1 text-gray-400'>R</span> <span>{view}</span></p>
                <p className='after:absolute relative after:bg-white after:top-0 after:h-full after:right-0 after:w-[2px] pr-3'>{date}</p>
                <p className='flex items-center gap-2'><span className='hover:text-gray-300 cursor-pointer transition-colors ease-in-out duration-500'>Thriller</span><span className='hover:text-gray-300 cursor-pointer transition-colors ease-in-out duration-500'>Action</span><span className='hover:text-gray-300 cursor-pointer transition-colors ease-in-out duration-500'>Sci-Fi</span></p>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <p>{isAdult ? "PG 13" : "PG 13"}</p>
                <p className={`${like ? 'text-red-600': 'text-white'}`} onClick={()=> {
                  setLike(!like)
                  dispatch(returnDetail())
                }}><BsFillHeartFill /></p>
                <p onClick={()=> setShowVid(!showVid)} className='group relative text-6xl play hover:text-blue-300 transition-colors duration-300 ease-in-out'><BsPlayCircleFill /><small className='absolute -right-6 -top-5 text-sm hidden group-hover:block group-hover:text-white w-[90px]'>Watch Trailer</small></p>
              </div>
              <p className='text-lg capitalize text-gray-300'>{language !== 'en' ? "Subtitle is available in English, spanish and French": "Subtitle is available in other languages including English, spanish and fremch"}</p>
              <p className='mt-12'>{desc}</p>
            </div>
            <div className={`${showVid === true ? "block transition-all ease-in-out duration-500": "hidden transition-all ease-in-out duration-500"} group fixed top-20 left-[50%] -translate-x-[50%] z-20 lg:w-[75%] w-[100%] h-[250px] rounded-lg`}>
                <p className='absolute top-4 right-4 text-2xl hidden group-hover:block cursor-pointer hover:text-gray-300 z-50' onClick={() => setShowVid(false) }><FaTimes /></p>
            <video controls muted={false} className=' w-full rounded-lg'>
              <source src={vid} type="video/mp4" />
            </video>
            </div>
       </div>
    </div> 
  );
}

export default MoviesDetails
