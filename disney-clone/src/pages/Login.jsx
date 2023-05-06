import React from 'react'
import loginBg from '../assets/images/login-background.jpg'
import hulu from '../assets/images/cta-logo-one.svg'
import hulutwo from '../assets/images/cta-logo-two.png'


const Login = (props) => {

  return (
   <div className="relative w-full h-screen flex justify-center items-center">
    <img src={loginBg} alt="bg" className='absolute -z-[1] top-0 h-[100%] left-0 w-[100%] ' />
        <div className='text-white z-[3] w-[70%] md:w-[50%] flex flex-col items-center justify-center gap-3'>
            <img src={hulu} alt="hulu" className='w-[100%]' />
            <button className='bg-blue-700 hover:bg-blue-400 transition-bg ease-in-out cursor-pointer font-medium h-[45px] w-[100%] rounded-md animated-button'>GET ALL THERE</button>
            <p className='text-center text-sm text-[hsla(0, 0%, 95.3%, 1)]'>  Get Premier Access to Raya and the Last Dragon for an additional fee
            with a Disney+ subscription. As of 03/26/21, the price of Disney+
            and The Disney Bundle will increase by $1.</p>
            <img src={hulutwo} alt="huluDisney+" />
        </div>
   </div>
  )
  
}

export default Login
