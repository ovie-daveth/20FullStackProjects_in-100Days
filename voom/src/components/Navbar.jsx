import React, {useEffect} from 'react'
import { login, logout } from '../strore/user'
import {AiOutlineLogout} from 'react-icons/ai'
import {BsMoonFill, BsSun} from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import { toast } from 'react-toastify'
import { app } from '../firebaseConfig'


const Navbar = ({LightTheme, ChangeTheme}) => {

    const dispatch = useDispatch() 
   const user = useSelector((state)=> state.user.value)
   const storedData = localStorage.getItem('user')
  useEffect(()=>{
    if(storedData){
        dispatch(login(JSON.parse(storedData)))
        console.log("STORED DATA:", JSON.parse(storedData))
    } else{
        console.log("STORED DATA:", JSON.parse(storedData))
    }
  }, [dispatch])

    const logmeOut = () => {
        // localStorage.removeItem('user')
        // dispatch(logout())
        const auth = getAuth(app);
            signOut(auth).then(() => {
                toast.success("Logged out successfully")
                localStorage.removeItem('user');
                dispatch(logout())
            // Sign-out successful.
            }).catch((error) => {
            // An error happened.
            });
      }
    
    
    
  return (
    <nav className='bg-black shadow-lg flex items-center justify-between py-4 px-3 z-50'>
    <Link to='/home' className="text-blue-500 font-bold md:text-xl text-lg">VOOM</Link>
    <p className='text-white font-bold text-md md:text-xl'>Hello, <span className="text-blue-600">
      { !storedData ? 
      (
        <Link className="cursor-pointer hover:text-blue-500" to='/'>Please Sign In</Link>
      )
      : user.name}</span></p>
    <div className="flex items-center gap-3">
        <span onClick={ChangeTheme} className='text-black bg-white text-xl p-1 flex items-center justify-center rounded-sm cursor-pointer'>
            {
                LightTheme ? (<BsMoonFill />): (<BsSun />)
            }
        </span>
        <button onClick={logmeOut} className='text-white hover:text-blue-500 transition-colors ease-in-out duration-300 text-xl'><AiOutlineLogout /></button>
    </div>
</nav>
  )
}

export default Navbar
