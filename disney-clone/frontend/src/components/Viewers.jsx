import React from 'react'
import view1 from '../assets/images/viewers-disney.png'
import view2 from '../assets/images/viewers-marvel.png'
import view3 from '../assets/images/viewers-national.png'
import view4 from '../assets/images/viewers-pixar.png'
import view5 from '../assets/images/viewers-starwars.png'
import vid1 from "../assets/videos/disney.mp4"
import vid2 from "../assets/videos/marvel.mp4"
import vid3 from "../assets/videos/geographic.mp4"
import vid4 from "../assets/videos/pixar.mp4"
import vid5 from "../assets/videos/star-wars.mp4"

const Viewers = () => {
    const vids = [vid1, vid2, vid5, vid3, vid4]
    const views = [view1, view2, view5, view3, view4]
  return (
    <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 mt-5 md:mt-3 gap-2 px-6'>
        {views.map((view, index) => (
        <div key={index} className="block relative group border-[2px] border-gray-500 rounded-md hover:scale-105 transition-transform duration-500 ease-in-out">
          <img src={view} alt={`view${index}`} className='  ' />
          <video autoPlay muted loop className='group-hover:block  hidden absolute top-0 h-[100%] opacity-80'>
            <source src={vids[index]} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  )
}

export default Viewers
