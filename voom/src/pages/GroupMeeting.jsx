import { addDoc, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import {useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { meetingRef, userRef } from '../firebaseConfig'
import uuid from 'react-uuid'
import Navigation from '../components/Navigation'


export default function GroupMeeting({darkTheme}) {
  
  const [checkedJoin, setCheckedJoin] = useState(false)
  const [checkedInstant, setCheckedInstant] = useState(false)
  const [meetingName, setMeetingName] = useState([])
  const [date, setDate] = useState('')
  const [numberOfFriends, setNumberOfFriends] = useState('')
  const [error, setError] = useState(false)

  const [users, setUsers] = useState([])
  const {uid} = useSelector((state)=> state.user.value)
  console.log('This is from redux', uid)

  useEffect(()=>{
    if(uid){
        const getUsers = async () => {
            const userQuery = query(userRef, where("uid", "!=", uid));
            const data = await getDocs(userQuery);
            const Users = []
            data.forEach((user) => {
                const userData = user.data();
                Users.push({
                    ...userData,
                    label: userData.name
                    
                })
            }) 
            setUsers(Users)
        }
        getUsers()
    }
}, [uid])

  const user = useSelector((state) => state.user.value)

  const [labelClass, setLabelClass] = useState('font-semibold');

  const nav = useNavigate()

  const anyoneJOins = (e) => {
      setCheckedJoin(!checkedJoin)
  }
  const instantMeeting = () => {
    setCheckedInstant(!checkedInstant)
  }


  const handleInputClick = () => {
    setLabelClass('font-semibold text-blue-500');
  }
  const createMeeting = async (e) => {
    e.preventDefault();
    if(meetingName.length < 2){
      setError(true)
      toast.error("Please Input a valid meeting name")
      } else if(numberOfFriends < 2){
        setError(true)
      toast.error("User must be more than 1 person")
      } else if(date === undefined){
        setError(true)
        toast.error('Invalid date provided')
      } else{
        const meetingId = uuid()
        const dateEl = new Date();
        const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
        const formattedDate = dateEl.toLocaleDateString('en-US', options).replace(/\//g, '-');
        await addDoc(meetingRef, {
          createdBY: uid,
          meetingId,
          name: meetingName,
          type: checkedJoin === true ? "Anyone-can-join" : "closed-Group",
          invitedUsers: [], 
          date: checkedInstant === true ? formattedDate : date,
          maxUsers: checkedJoin ? 100 : numberOfFriends,
          status: true,
        })
        nav('/home')
        toast.success(`${meetingName}, "Created sucessfully"`)
      }
   }
  
  
 

  
  return (
    <>
    <Navigation />
    <div className={`px-2`}>
      <form className={`lg:w-[25%] md:w-[50%] w-[90%] m-auto flex flex-col gap-6 translate-y-[20%] ${error === true && 'border-[1px] border-red-300 px-3 py-4 shadow-xl'}`}>
      
          <div className={`flex flex-col gap-1 `}>
              <label className={`font-semibold' htmlFor="name ${labelClass}`}>
                Hey {user.name}, give me a name
              </label>
              <input type="text" id='name' placeholder='Meeting Name' className='border-[1px] border-gray-600 bg-white w-[100%] h-[40px] px-3 outline-none rounded-md' value={meetingName} onChange={(e) => setMeetingName(e.target.value)} onClick={handleInputClick} />
          </div>
          <div className="flex items-center justify-between font-semibold -my-3">
            <p className='text-gray-600'>Anyone can join</p>
            <input
              class="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-blue-600 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-red-400 after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary "
              type="checkbox"
              role="switch"
              // name="anyoneJOins"
              id="flexSwitchChecked"
              checked={checkedJoin}
              onChange={anyoneJOins}
               />
        </div>
          <div className="flex flex-col gap-1 ">
              <label className='font-semibold' htmlFor="name">
                Invite friends
              </label>
              <input type="number"
               className='border-[1px] border-gray-600 bg-white w-[100%] h-[40px] px-3 outline-none rounded-md'
                max={checkedJoin === true ? null : 20} 
                min="2" placeholder={checkedJoin === true ? "Unlimited" : 'max is 20'} 
                
                value={numberOfFriends} 
                onChange={e => {
                  if(checkedJoin === true){
                    setNumberOfFriends(e.target.value)
                  }else{
                    if(!e.target.value.length ) setNumberOfFriends('')
                    else if(+e.target.value === 0) setNumberOfFriends(2)
                    else if(+e.target.value >  20) setNumberOfFriends(20)
                    else setNumberOfFriends(+e.target.value)
                  }
                  
                }} />
          </div>
          <div className="flex items-center justify-between font-semibold -my-3">
            <p className='text-gray-600'>Create an instant Meeting</p>
            <input
              class="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-blue-600 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-red-400 after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary "
              type="checkbox"
              role="switch"
              id="flexSwitchChecked"
              // name="instantMeeting"
              checked={checkedInstant}
              onChange={instantMeeting}
               />
        </div>
          <div className="block">
              <label className='font-semibold' htmlFor="name">
               Select a meeting Date
              </label>
              <input disabled={checkedInstant === true && true} type="date" id="name" placeholder={new Date().toISOString().substr(0,10)} value={date} onChange={(e)=> setDate(e.target.value)} className={`${checkedInstant === true && 'placeholder:text-gray-200 text-gray-400'} border-[1px] border-gray-600 bg-white w-[100%] h-[40px] px-3 outline-none rounded-md ${darkTheme && 'text-black'}`} />
          </div>
          <div className="flex items-center justify-between mt-3">
            <Link to='/create' className=' rounded-md bg-red-700 border-none text-white px-9 py-2 font-semibold hover:bg-red-500 transition-bg ease-in-out duration-500'>Cancel</Link>
            <button 
            onClick={createMeeting}
            className=' rounded-md bg-blue-700 border-none text-white px-6 py-2 font-semibold hover:bg-blue-500 transition-bg ease-in-out duration-500'>Create Meeting</button>
          </div>
      </form>
    </div>
    </>
  )
}








