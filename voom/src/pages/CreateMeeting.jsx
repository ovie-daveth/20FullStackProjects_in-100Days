import React from 'react'
import {AiOutlineSchedule} from 'react-icons/ai'

import {IoIosCreate} from 'react-icons/io'
import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'

const CreateMeeting = ({darkTheme}) => {
  return (
    <>
    <Navigation />
      <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-3 gap-0  pt-4 lg:w-[80%] md:h-[500px] h-screen md:translate-y-[2rem] md:absolute lg:left-[20%] md:left-[17%] lg:top-[10%] md:top-[20%] md:-translate-[50%] md:justify-between lg:px-10 px-5 py-[4rem] md:py-[unset] ">
        <Link   to='/meeting' className="flex flex-col items-center justify-center shadow-lg rounded-md border-[1px] border-slate-300 h-[200px] md:w-[100%] w-[80%] m-auto md:hover:scale-y-[1.2] hover:scale-x-[1.1] transition-all ease-in-out duration-700 px-4">
            <span className={`${darkTheme ? 'text-blue-500': 'text-blue-900'} text-[2.8rem] `}><IoIosCreate /></span>
            <h2 className={`${darkTheme ? 'text-white': 'text-black'} font-bold text-lg`}>Create 1 on 1 meeting</h2>
            <p className="text-sm text-gray-700">Create a meeting with a friend</p>
        </Link>
        <Link   to='/meetings' className="flex flex-col items-center justify-center shadow-lg rounded-md border-[1px] border-slate-300 h-[200px] md:w-[100%] w-[80%] m-auto md:hover:scale-y-[1.2] hover:scale-x-[1.1] transition-all ease-in-out duration-700 px-4">
            <span className={`${darkTheme ? 'text-blue-500': 'text-blue-900'} text-[2.8rem] `}><AiOutlineSchedule /></span>
            <h2 className={`${darkTheme ? 'text-white': 'text-black'} font-bold text-lg`}>Create a video conference</h2>
            <p className="text-sm text-gray-700">Invite multiple persons to your meeting</p>
        </Link>
      </div>
    </>
  )
}

export default CreateMeeting
