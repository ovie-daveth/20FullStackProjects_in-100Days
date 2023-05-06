import React, { useState } from 'react'
import Logo from '../assets/images/logo.svg'
import search from '../assets/images/search-icon.svg'
import watchlist from '../assets/images/watchlist-icon.svg'
import original from '../assets/images/original-icon.svg'
import movie from '../assets/images/movie-icon.svg'
import series from '../assets/images/series-icon.svg'
import home from '../assets/images/home-icon.svg'
import { Link } from 'react-router-dom'

const Header = () => {
    const [isLogin, setIsLogin] = useState(false)

    const menu = [
        {
            id: 1,
            name: 'home',
            path: '/home',
            img: home
        },
        {
            id: 2,
            name: 'search',
            path: '/home',
            img: search
        },
        {
            id: 3,
            name: 'watchlist',
            path: '/home',
            img: watchlist
        },
        {
            id: 4,
            name: 'originals',
            path: '/home',
            img: original
        },
        {
            id: 5,
            name: 'movies',
            path: '/home',
            img: movie
        },
        {
            id: 6,
            name: 'series',
            path: '/home',
            img: series
        },
    ]

    const handleLogin = () => {
        setIsLogin(true)
    }
    const handleLogout = () => {
        setIsLogin(false)
    }
  return (
    <div className='bg-black fixed left-0 w-full top-0 h-[70px] flex items-center justify-between px-7 z-20'>
      <div className='flex items-center gap-12'>
            <img src={Logo} alt="DisneyLogo+" className='w-[100px]' />
            {
                isLogin === true && (
                    <div className='md:flex hidden items-center gap-7'>
                      {
                        menu.map((item) => (
                            <Link to={item.path} key={item.id} className='flex items-end gap-1 before:w-[0] hover:before:w-[70px] before:absolute relative before:h-[1.3px] before:bg-white before:-bottom-1 before:transition-all before:ease-in-out duration-500 hover:text-[rgb(249 249 249)]'>
                            <img src={item.img} alt="home-icon" className='w-[30px]' />
                            <span className='text-md'>{item.name}</span>
                            </Link>
                        ))
                      }
                        
                    </div>
                )
            }
      </div>
      <div>
        {
            isLogin === true ? (
                <button className='border border-gray-400 px-6 py-1 hover:bg-slate-700 ' onClick={handleLogout}>Logout</button>
            ) : (
                <button className='border border-gray-400 px-6 py-1 hover:bg-slate-700 ' onClick={handleLogin}>Login</button>
            )
        }
      </div>
    </div>
  )
}

export default Header
