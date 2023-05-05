import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

const Navigation = ({darkTheme}) => {
    const location = useLocation()
    
  return (
    <div className={`${darkTheme ? 'bg-black text-white border-slate-300 ': 'bg-white text-black'} border-b-[1px]  shadow-md py-3 px-3`}>
      {
        location.pathname === "/home" && (
            <Link to='/home' className="md:text-lg text-sm font-semibold text-white px-2 py-1 bg-blue-600 rounded-lg">Dashboard</Link>
          )
      } 
      {
        location.pathname === "/create" && (
            <div className='flex items-center gap-3'>
            <Link to='/home' className="md:text-lg text-sm font-semibold text-white px-2 py-1 bg-blue-600 rounded-lg">Dashboard</Link>
            <Link to='/create' className="md:text-lg text-sm font-semibold text-white px-2 py-1 bg-blue-600 rounded-lg">Create Meeting</Link>
            </div>

          )
      }
       {
        location.pathname === "/schedule" && (
            <div className='flex items-center gap-3'>
            <Link to='/home' className="md:text-lg text-sm font-semibold text-white px-2 py-1 bg-blue-600 rounded-lg">Dashboard</Link>
            <Link to='/schedule' className="md:text-lg text-sm font-semibold text-white px-2 py-1 bg-blue-600 rounded-lg">Created Meetings</Link>
            </div>

          )
      }
       {
        location.pathname === "/manyschedule" && (
            <div className='flex items-center gap-3'>
            <Link to='/home' className="md:text-lg text-sm font-semibold text-white px-2 py-1 bg-blue-600 rounded-lg">Dashboard</Link>
            <Link to='/manyschedule' className="md:text-lg text-sm font-semibold text-white px-2 py-1 bg-blue-600 rounded-lg">Invited Meetings</Link>
            </div>

          )
      }
        {
        location.pathname === "/meeting" && (
            <div className='flex items-center gap-3'>
            <Link to='/home' className="md:text-lg text-sm font-semibold text-white px-2 py-1 bg-blue-600 rounded-lg">Dashboard</Link>
            <Link to='/create' className="md:text-lg text-sm font-semibold text-white px-2 py-1 bg-blue-600 rounded-lg">Created Meetings</Link>
            <Link to='/meeting' className="md:text-lg text-sm font-semibold text-white px-2 py-1 bg-blue-600 rounded-lg">Personal Meeting</Link>
            </div>

          )
      }
       {
        location.pathname === "/meetings" && (
            <div className='flex items-center gap-3'>
            <Link to='/home' className="md:text-lg text-sm font-semibold text-white px-2 py-1 bg-blue-600 rounded-lg">Dashboard</Link>
            <Link to='/create' className="md:text-lg text-sm font-semibold text-white px-2 py-1 bg-blue-600 rounded-lg">Created Meetings</Link>
            <Link to='/meetings' className="md:text-lg text-sm font-semibold text-white px-2 py-1 bg-blue-600 rounded-lg">Conference Video</Link>
            </div>

          )
      }
      
    </div>
  )
}

export default Navigation
