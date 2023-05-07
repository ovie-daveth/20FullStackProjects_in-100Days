import React, { useEffect, useState } from 'react' //controls the state of the component

//Imorting the img used a sicons for my menus
import Logo from '../assets/images/logo.svg'
import search from '../assets/images/search-icon.svg'
import watchlist from '../assets/images/watchlist-icon.svg'
import original from '../assets/images/original-icon.svg'
import movie from '../assets/images/movie-icon.svg'
import series from '../assets/images/series-icon.svg'
import home from '../assets/images/home-icon.svg'
import {MdMenu} from 'react-icons/md'

// importing the dependencies used for authentication and authorization
import { Link } from 'react-router-dom'
import GoogleSignUpButton from './GoogleSignUpButton'
import { getAuth, signOut } from "firebase/auth";
import { toast } from 'react-toastify'

// importing from redux to manage the signed in and signed ot user state
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../states/reducers/userSlice'
import { app } from '../firebaseConfig'

const Header = () => {
    // creating a list of objects for my menus
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
    
    // The various states of my header
    const {photoURL} = useSelector((store) => store.user.value) //getting the signed in user img link to showcase in the header
    const [isLogin, setIsLogin] = useState(false) // to show when a user is logged in
    const [isSignUp, setIsSignUp] = useState(false) // to display the sign up form onclick
    const [showLogin, setShowLogin] = useState(false) //to display the login form onclick
    const dispatch = useDispatch() // to get the values stored in our store
    const auth = getAuth(app); // authentication from firebase

    const storedData = localStorage.getItem('user') // to help us maintain the user info on refresh

    //to help us maintain the user info on refresh
    useEffect(()=>{
        if(storedData){
            dispatch(login(JSON.parse(storedData)))
            console.log("STORED DATA:", JSON.parse(storedData))
            setIsLogin(true) //so if I refresh and the user is logged in, maintain the islogin === true
        } else{
            setIsLogin(false) // if I refresh and the user is logged out, maintain the islogin === false
        }
    }, [dispatch, storedData])
    
    //The events handlers
    const showSignup = () => {
        setIsSignUp(!isSignUp) //when user click the button to login initially it will display the signup form
    }
    const showLoginForm = () => {
        setShowLogin(!showLogin) //when user click the link to signin instead it will display the signin form
    }
    const showSignupForm = () => {
        setShowLogin(!showLogin) //when user click the link to signup it will display the signup form
    }

    //SignUp form
    const handleSignUp = (e) => {
        e.preventDefault()
        toast.success("Your account has been created")
    }

    //Sign IN form
    const handleLogin = (e) => {
        e.preventDefault()
        setIsLogin(true) // when user is signed in
        toast.success("You can now explore")
    }

    //Logout 
    const handleLogout = () => {
        signOut(auth).then(() => {
            setIsLogin(false)
            setIsSignUp(false)
            localStorage.removeItem('user')
            dispatch(logout())
            toast.success("Signed out successfully")
        }).catch((error) => {
            toast.error(error.message)
        });
        
    }
  
   
  return (
    <div className='bg-black fixed left-0 w-full top-0 h-[70px] flex items-center justify-between px-7 z-20'>
      <div className='flex items-center lg:gap-12 gap-5'>
            <img src={Logo} alt="DisneyLogo+" className='lg:w-[100px] w-[80px]' />
            {
                isLogin === true && (
                    <div className='md:flex text-sm lg:text-md hidden items-center lg:gap-7 gap-4'>
                      {
                        menu.map((item) => (
                            <Link to={item.path} key={item.id} className='flex items-end gap-1 before:w-[0] hover:before:w-[70px] before:absolute relative before:h-[1.3px] before:bg-white before:-bottom-1 before:transition-all before:ease-in-out duration-500 hover:text-[rgb(249 249 249)]'>
                            <img src={item.img} alt="home-icon" className='lg:w-[30px] w-[20px]' />
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
                <div className='flex items-center gap-3'>
                <img src={photoURL} alt="userImg" className='rounded-full w-[40px] border border-slate-300' />
                <p className='text-2xl block md:hidden'><MdMenu /></p>
                <button className='hidden md:block border border-gray-400 px-6 py-1 hover:bg-slate-700 ' onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <>
                    <button className='border border-gray-400 px-6 py-1 hover:bg-slate-700 ' onClick={showSignup}>Login</button>
                    <div className={`bg-white text-black px-6 py-2 absolute top-20 transition-opacity ease-in-out duration-700 right-4 ${isSignUp ? ' opacity-100': ' opacity-0'}`}>
                    <form className={`${showLogin ? 'hidden': 'flex flex-col'}`} >
                        <h2 className='font-semibold mb-3'>Signup with Email</h2>
                       <div className="flex flex-col gap-3 justify-center">
                            <div className="block">
                                <input className='w-full bg-gray-500 text-white placeholder:text-white px-2 py-1 placeholder:text-sm text-sm rounded-md outline-none' type="text" placeholder='Enter Email' />
                            </div>
                            <div className="block">
                                <input className='w-full bg-gray-500 text-white placeholder:text-white px-2 py-1 placeholder:text-sm text-sm rounded-md outline-none' type="text" placeholder='Enter first name' />
                            </div>
                            <div className="block">
                                <input className='w-full bg-gray-500 text-white placeholder:text-white px-2 py-1 placeholder:text-sm text-sm rounded-md outline-none' type="text" placeholder='Enter Password' />
                            </div>
                            <div className="block">
                                <input className='w-full bg-gray-500 text-white placeholder:text-white px-2 py-1 placeholder:text-sm text-sm rounded-md outline-none' type="text" placeholder='Comfirm Passowrd' />
                            </div>
                            <button onClick={handleSignUp} className='w-full bg-blue-600 py-1 text-white rounded-md'>signup</button>
                            <small className='font-semibold italic'>Already have an account <span className='text-blue-400 cursor-pointer font-bold hover:text-blue-600' onClick={showLoginForm}>login</span></small>
                            <GoogleSignUpButton text="Signup with Google" setIsLogin={setIsLogin} setShowLogin={setShowLogin} />
                       </div>
                    </form>
                    <form className={`${showLogin ? 'flex flex-col': 'hidden'}`}>
                        <h2 className='font-semibold mb-3'>Login to your account</h2>
                       <div className="flex flex-col gap-3 justify-center">
                            <div className="block">
                                <input className='w-full bg-gray-500 text-white placeholder:text-white px-2 py-1 placeholder:text-sm text-sm rounded-md outline-none' type="text" placeholder='Enter Email' />
                            </div>
                            <div className="block">
                                <input className='w-full bg-gray-500 text-white placeholder:text-white px-2 py-1 placeholder:text-sm text-sm rounded-md outline-none' type="text" placeholder='Enter Password' />
                            </div>
                            <button onClick={handleLogin} className='w-full bg-blue-600 py-1 text-white rounded-md'>Login</button>
                            <small className='font-semibold italic'>Don't have an account? <span className='text-blue-400 cursor-pointer font-bold hover:text-blue-600' onClick={showSignupForm}>SignUp</span></small> 
                            <GoogleSignUpButton text="Signin with Google" setIsLogin={setIsLogin} setShowLogin={setShowLogin} />
                       </div>
                    </form>
                    </div>
                </>
            )
        }
      </div>
    </div>
  )
}

export default Header
