import React from 'react'
import homebg from "../assets/images/home-background.png"
import ImageSlider from '../components/ImageSlider'
import Viewers from '../components/Viewers';
import Recommends from '../components/Recommends';

const Home = () => {
  const movie = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  const movie2 = ['A', 'B', 'E', 'R', 'G', 'H', 'J', 'T', 'Y', 'U', 'I', 'O', 'Q', 'W', 'S', 'D', 'F', 18, 19, 20, 21, 22, 23, 24];
  return (
    <div className="mt-16 overflow-hidden">
      <ImageSlider />
      <Viewers />
      <Recommends videoclass="Recommended for you" movie={movie} />
      <Recommends videoclass="New to Disney+" movie={movie2} />
      <div className="-z-10 absolute top-16">
        <img src={homebg} alt="bg" className="w-[100vw] h-screen" />
      </div>
    </div>
  );
}

export default Home
