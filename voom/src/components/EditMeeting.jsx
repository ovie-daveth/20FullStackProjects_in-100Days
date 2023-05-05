import React, {useState} from 'react'
import { toast } from 'react-toastify';
import {FaTimes} from 'react-icons/fa'

const EditMeeting = ({darkTheme, closeEdit}) => {
    const [meetingName, setMeetingName] = useState('')
    const [friend, setFriend] = useState('')
    const [labelClass, setLabelClass] = useState('font-semibold');

    const handleInputClick = () => {
        setLabelClass('font-semibold text-blue-500');
      }
      
      
      const creareMeeting =(e) => {
        e.preventDefault()
        toast.success(`${meetingName}, "Edited sucessfully" `)
      }
  return (
    <div className={`${darkTheme ? 'bg-black text-white' : 'bg-white text-black' } py-6 relative`}>
        <h1 className={`md:text-4xl text-2xl font-bold px-10 pb-4`}>Video Conference</h1>
        <hr className={`${darkTheme && 'bg-white'} bg-gray-500 h-[2px]`} />
        <span className='absolute right-6 top-8 text-gray-500 hover:text-gray-600' onClick={closeEdit}><FaTimes /></span>
        <form className='lg:w-[65%] md:w-[70%] w-[100%] flex flex-col gap-6 mt-8 mx-10'>
          <div className={`flex flex-col gap-1 ${labelClass} `}>
              <label className='font-semibold' htmlFor="name">
                Meeting Name
              </label>
              <input type="text" id='name' placeholder='Meeting Name' className='border-[1px] border-gray-600 bg-white w-[100%] h-[40px] px-3 outline-none rounded-md' value={meetingName} onChange={(e) => setMeetingName(e.target.value)} onClick={handleInputClick} />
          </div>
          <div className="flex flex-col gap-1 ">
              <label className='font-semibold' htmlFor="name">
                Invite a friend
              </label>
              <select name="user" id="user" className={`border-[1px] border-gray-600 bg-white w-[100%] h-[40px] px-3 font-semibold outline-none rounded-md ${darkTheme && 'text-black'}`}>
              <option value="volvo">Select a user</option>
                <option value="volvo">Favour Bukys</option>
                <option value="saab">Amadi John</option>
                <option value="mercedes">Okafor Bill</option>
                <option value="audi">Audi Mykel</option>
              </select>
          </div>
          <div className="block">
              <label className='font-semibold' htmlFor="name">
               Select a meeting Date
              </label>
              <input type="date" id="name" placeholder={new Date().toISOString().substr(0,10)} value={[]} onChange={[]} className={`border-[1px] border-gray-600 bg-white w-[100%] h-[40px] px-3 outline-none rounded-md ${darkTheme && 'text-black'}`} />
          </div>
          <div className='flex items-center gap-4 font-semibold'>
            <p>Cancel Meeting</p>
            <input
              class="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-blue-600 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-red-400 after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary "
              type="checkbox"
              role="switch"
              id="flexSwitchChecked"
               />
          </div>
          <div className="flex items-center gap-8 mt-1">
            <button className=' rounded-md bg-red-700 border-none text-white px-9 py-2 font-semibold hover:bg-red-500 transition-bg ease-in-out duration-500'>Cancel</button>
            <button 
            onClick={creareMeeting} type='submit'
            className=' rounded-md bg-blue-700 border-none text-white px-6 py-2 font-semibold hover:bg-blue-500 transition-bg ease-in-out duration-500'>Save Edit</button>
          </div>
      </form>
    </div>
  )
}

export default EditMeeting
