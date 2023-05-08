import React from 'react'
import homebg from "../assets/images/home-background.png"
import ImageSlider from '../components/ImageSlider'

const Home = () => {
  return (
    <div className="mt-16 overflow-hidden">
      <ImageSlider />
      <div className="-z-10 absolute top-16">
        <img src={homebg} alt="bg" className="w-[100vw] h-screen" />
      </div>
    </div>
  );
}

export default Home
