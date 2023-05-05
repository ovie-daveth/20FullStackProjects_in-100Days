import { useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import { login } from "../strore/user";
import {useDispatch} from 'react-redux'

import {AiOutlineSchedule} from 'react-icons/ai'

import {IoIosCreate} from 'react-icons/io'
import { Link } from "react-router-dom";
import { BsCalendarCheck } from "react-icons/bs";
import Navigation from "../components/Navigation";

const Home = ({darkTheme}) => {
    const dispatch = useDispatch() 
    const user = useSelector((state) => state.user.value)
    const storedData = localStorage.getItem('user')

  useEffect(()=>{
   
    if(storedData){
        dispatch(login(JSON.parse(storedData)))
    }
  }, [dispatch])

 
  return (
    <>
    <Navigation />
      <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3  pt-4 lg:w-[80%] md:h-[500px] h-screen md:translate-y-[2rem] md:absolute lg:left-[10%] md:left-[17%] lg:top-[10%] md:top-[20%] md:-translate-[50%] md:justify-between lg:px-10 px-5 py-[4rem] md:py-[unset ">
        <Link   to={!storedData ? '/home' : '/create'}
         onClick={!storedData ? () => alert('Please sign in') : undefined} className="flex flex-col items-center justify-center shadow-lg rounded-md border-[1px] border-slate-300 h-[200px] md:w-[100%] w-[80%] m-auto md:hover:scale-y-[1.2] hover:scale-x-[1.1] transition-all ease-in-out duration-700 px-4">
            <span className={`${darkTheme ? 'text-blue-500': 'text-blue-900'} text-[2.8rem] `}><IoIosCreate /></span>
            <h2 className={`${darkTheme ? 'text-white': 'text-black'} font-bold text-lg`}>Create Meeting</h2>
            <p className="text-sm text-gray-700">Create a new meeting and invite people</p>
        </Link>
        <Link   to={!storedData ? '/home' : '/schedule'}
        onClick={!storedData ? () => alert('Please sign in') : undefined} className="flex flex-col items-center justify-center shadow-lg rounded-md border-[1px] border-slate-300 h-[200px] md:w-[100%] w-[80%] m-auto md:hover:scale-y-[1.2] hover:scale-x-[1.1] transition-all ease-in-out duration-700 px-4">
            <span className={`${darkTheme ? 'text-blue-500': 'text-blue-900'} text-[2.8rem] `}><AiOutlineSchedule /></span>
            <h2 className={`${darkTheme ? 'text-white': 'text-black'} font-bold text-lg`}>My Meetings</h2>
            <p className="text-sm text-gray-700">View your created meetings</p>
        </Link>
        <Link   to={!storedData ? '/home' : '/manyschedule'}
      onClick={!storedData ? () => alert('Please sign in') : undefined} className="flex flex-col items-center justify-center shadow-lg rounded-md border-[1px] border-slate-300  h-[200px] md:w-[100%] w-[80%] m-auto md:hover:scale-y-[1.2] hover:scale-x-[1.1] transition-all ease-in-out duration-700 px-4">
            <span className={`${darkTheme ? 'text-blue-500': 'text-blue-900'} text-[2.8rem] `}><BsCalendarCheck /></span>
            <h2 className={`${darkTheme ? 'text-white': 'text-black'} font-bold text-lg`}>Meetings</h2>
            <p className="text-sm text-gray-700">View meetings you are invited to</p>
        </Link>
      </div>
      
    </>
  );
};

export default Home;
