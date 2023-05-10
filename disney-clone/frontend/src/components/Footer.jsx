import React from 'react'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='flex items-center flex-col md:flex-row justify-around border-t-2 border-gray-500 pt-6 mt-6 gap-4'>
      <div className="flex flex-col justify-center items-center">
        <h3>{`\u00A9`}DavetonAcademy</h3>
        <h3>08149485675</h3>
      </div>
      <div className="flex flex-col gap-1">
        <p>Follow me on</p>
        <div className="flex items-center gap-2">
        <a href="https://www.twitter.com/ovie_omokefe" target='_blank' rel="noreferrer" className='hover:text-gray-300 transition-colors ease-in-out duration-500'><FaTwitter /> </a>
        <a href="https://www.linkedin.com/in/omokefe-ovie" target='_blank' rel="noreferrer" className='hover:text-gray-300 transition-colors ease-in-out duration-500'><FaLinkedin /> </a>
        <a href="https://www.instagram.com/daveton_academy/" target='_blank' rel="noreferrer" className='hover:text-gray-300 transition-colors ease-in-out duration-500'><FaInstagram /> </a>
        <a href="https://www.github.com/ovie-daveth" target='_blank' rel="noreferrer" className='hover:text-gray-300 transition-colors ease-in-out duration-500'><FaGithub /> </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
