import React, {useState, useEffect} from 'react'
import {FiEdit} from 'react-icons/fi'
import {AiOutlineCopy} from "react-icons/ai"
import EditMeeting from '../components/EditMeeting'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getDocs, query, where } from 'firebase/firestore'
import { meetingRef } from '../firebaseConfig'
import { toast } from 'react-toastify'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Navigation from '../components/Navigation'

const OneSchedule = ({darkTheme}) => {
    const {uid} = useSelector((store)=> store.user.value)
    const nav = useNavigate()
    const [edit, setEdit] = useState(false)
    const [meetings, setMeetings] = useState([])
    const [copy, setCopy] = useState(false)

    useEffect(() => {
        const getMeetinsg = async () => {
            const userQuery = query(meetingRef, where("createdBY", '==', uid));
            const fetchMeeting = await getDocs(userQuery);
            if(fetchMeeting.docs.length){
                const myMeeting = [];
                fetchMeeting.forEach((meeting) => {
                    myMeeting.push({
                        docId: meeting.id,
                        ...(meeting.data())
                    })
                })

                setMeetings(myMeeting)
                myMeeting.map((item)=> {
                    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
                    const date = new Date(item.date);
                    const meetingDate = date.toLocaleDateString('en-US', options).replace(/\//g, '-');
                    const dateEl = new Date();
                    const now = dateEl.toLocaleDateString('en-US', options).replace(/\//g, '-');
                    console.log(now)
                    if (meetingDate < now) {
                    item.status = 'Ended';
                    } else if (meetingDate === now) {
                    item.status = 'Join room';
                    } else {
                    item.status = 'Watlist';
                    }
            })
            }
        }
        getMeetinsg()
    }, [uid])

    const showEdit = () => {
        setEdit(true)
    }
    const closeEdit = () => {
        setEdit(false)
    }
    const joinRoom = () => {
        const meetingToJoin = meetings.find((item) => item.status === 'Join room');
        if (meetingToJoin) {
          nav(`/room/${meetingToJoin.meetingId}`);
          toast.success("Joined room successfully");
        }
      };
      
    
    
  return (
    <>
    <Navigation />
    <div className='py-4'>
       <table className='w-[97%] m-auto mt-2 border-collapse flex flex-col gap-3'>
            <thead className='text-[12px] md:text-lg'>
                <tr className='grid grid-cols-5 lg:gap-24 sm:gap-5 border-b-[1px] border-gray-200 shadow-lg py-2 md:font-semibold font-bold '>
                    <td className=''>Meeting Name</td>
                    <td className=''>Meeting Type</td>
                    <td className=''>Meeting Date</td>
                    <td className=''>Status</td>
                    <td className='flex items-center md:gap-10 gap-2'>
                        <span>Edit</span>
                        <span>Copy</span>
                    </td>
                </tr>
            </thead>
           { !meetings.length < 1 ? (
            meetings.map((item)=> (
                <tbody key={item.docId} className='text-[12px] md:text-lg'>
                <tr className='md:grid md:grid-cols-5 lg:gap-24 md:gap-8   border-b-[1px] border-gray-200 shadow-lg py-2'>
                    <td className='md:w-[unset]'>{item.name}</td>
                    <td className='md:w-[unset]'>{item.type}</td>
                    <td>{item.date}</td>
                    <td  ><button onClick={joinRoom} disabled={item.status === 'Join room' ? false : true} className={`${item.status === 'Ended' ? 'bg-red-600': item.status === 'Watlist' ? 'bg-blue-600' : 'bg-green-500'} ${item.status === 'Join room' ? null : 'opacity-50'} text-white font-medium px-6 py-[3px] text-md cursor-pointer hover:bg-green-400`}>{item.status}</button></td>
                    <td className='flex items-center md:gap-12 gap-2'>
                        <button
                        onClick={showEdit}
                        disabled={item.status === 'Ended' && true}
                        className={` ${item.status === 'Ended' && ' opacity-50'} bg-red-400 text-red-700 px-1 py-2 text-lg hover:text-red-600 hover:bg-red-300 transition-all ease-in-out duration-300 active:scale-90 `}><FiEdit /></button>
                        <span 
                         disabled={item.status === 'Ended' && true}
                        className={` ${item.status === 'Ended' && ' opacity-50'} bg-blue-400 text-blue-700 px-1 py-2 text-lg hover:text-blue-600 hover:bg-blue-300 transition-all ease-in-out duration-300 active:scale-90`}>
                            <CopyToClipboard onCopy={()=> {
                                setCopy(true)
                                toast.success("Link copied succesfully")
                                }} text={`localhost:3000/room/${item.meetingId}`}>
                              <button><AiOutlineCopy /></button>
                            </CopyToClipboard>    
                        </span>
                    </td>
                </tr>
            </tbody>
            ))):
            (
                <h1 className='text-center font-bold text-2xl mt-4 italic text-red-600'>You don't have any meeting created yet</h1>
            )
           }
       </table>
    </div>
    <div className={`${edit === true ? ' translate-x-0' : ' translate-x-[100%]'} transition-transform ease-in-out duration-500 fixed right-0 top-0 bottom-0 md:w-[50%]`}>
        <EditMeeting darkTheme={darkTheme} closeEdit={closeEdit} />
    </div>
    </>
  )
}

export default OneSchedule
