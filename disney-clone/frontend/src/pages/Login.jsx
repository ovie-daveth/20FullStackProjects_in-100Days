import React, { useEffect, useState } from 'react'
import loginBg from '../assets/images/login-background.jpg'
import hulu from '../assets/images/cta-logo-one.svg'
import hulutwo from '../assets/images/cta-logo-two.png'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../states/reducers/userSlice'
import { useNavigate } from 'react-router-dom'


const Login = ({message}) => {

  const user = useSelector((store) => store.user.value)
  console.log(user.name.length)
  const dispatch = useDispatch()
  const nav = useNavigate()
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const storedData = localStorage.getItem('user') // to help us maintain the user info on refresh

    //to help us maintain the user info on refresh
    useEffect(()=>{
        if(storedData){
            dispatch(login(JSON.parse(storedData)))
        } else{
           
        }
    }, [dispatch, storedData])

    const handleExplore = () => {
      if(storedData){
        nav("/home")
      } else{
        setError(!error)
        setErrorMessage("Please SignIn to Explore")

        setTimeout(() => {
          setError(false);
          setErrorMessage('');
        }, 3000);
      }
    }

  return (
   <div className="relative w-full h-screen flex justify-center items-center">
    <img src={loginBg} alt="bg" className='absolute -z-[1] top-0 h-[100%] left-0 w-[100%] ' />
        <div className='text-white z-[3] w-[70%] md:w-[50%] flex flex-col items-center justify-center gap-3'>
            <img src={hulu} alt="hulu" className='w-[100%]' />
            <p className='text-white font-semibold italic self-start -mb-2'>{message} {errorMessage}</p>
            <button onClick={handleExplore} className='bg-blue-700 hover:bg-blue-400 transition-bg ease-in-out cursor-pointer font-medium h-[45px] w-[100%] rounded-md animated-button'>GET ALL THERE</button>
            <p className='text-center text-sm text-[hsla(0, 0%, 95.3%, 1)]'>  Get Premier Access to Raya and the Last Dragon for an additional fee
            with a Disney+ subscription. As of 03/26/21, the price of Disney+
            and The Disney Bundle will increase by $1.</p>
            <img src={hulutwo} alt="huluDisney+" />
        </div>
   </div>
  )
  
}

export default Login
