import React, {useState, useEffect} from 'react'
import {AiOutlineCopy} from "react-icons/ai"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getDocs, query, where } from 'firebase/firestore'
import { meetingRef } from '../firebaseConfig'
import { toast } from 'react-toastify'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Navigation from '../components/Navigation'
import { Rings } from 'react-loader-spinner'

const ManySchedule = ({darkTheme}) => {
    const {uid} = useSelector((store)=> store.user.value)
    console.log(uid)
    const nav = useNavigate()
    const [meetings, setMeetings] = useState([])
    const [copy, setCopy] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const getMeetinsg = async () => {
            const userQuery = query(meetingRef, where("createdBY", '!=', uid));
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
        setIsLoading(false)
    }, [uid])

   
    const joinRoom = () => {
        const meetingToJoin = meetings.find((item) => item.status === 'Join room');
        if (meetingToJoin) {
          nav(`/room/${meetingToJoin.meetingId}`);
          toast.success("Joined room successfully");
        }
      };
      
    
  return (
    <>
    {
        isLoading === true ? (
            <div className="absolute md:top-[30%] top-[20%] -translate-[50%] lg:left-[40%] md:left-[35%] left-[20%]">
              <Rings
                height="240"
                width="240"
                color="#4fa94d"
                radius="12"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="rings-loading"
              />
          </div>
        ) : (
            <>
             <Navigation />
    <div className='py-4'>
       <table className='w-[97%] m-auto mt-2 border-collapse flex flex-col gap-3'>
            <thead className='text-[12px] md:text-lg px-2'>
                <tr className='md:grid md:grid-cols-5 lg:gap-24 md:gap-10 flex items-center justify-between border-b-[1px] border-gray-200 shadow-sm py-2 md:font-semibold font-bold '>
                    <td className='md:w-[unset] w-[20%]'>Meeting Name</td>
                    <td className='md:w-[unset] w-[20%]'>Meeting Type</td>
                    <td className='md:w-[unset] w-[20%]'>Meeting Date</td>
                    <td className=''>Status</td>
                    <td className=''>
                        <span>Copy</span>
                    </td>
                </tr>
            </thead>
           { !meetings.length < 1 ? (
            meetings.map((item)=> (
                <tbody key={item.docId} className='text-[12px] md:text-lg'>
                <tr className='md:grid md:grid-cols-5 lg:gap-24 flex items-center justify-between md:gap-8 border-b-[1px] border-gray-200 shadow-sm py-2'>
                    <td className='md:w-[unset] w-[20%]'>{item.name}</td>
                    <td className=''>{item.type}</td>
                    <td>{item.date}</td>
                    <td  ><button onClick={joinRoom} disabled={item.status === 'Join room' ? false : true} className={`${item.status === 'Ended' ? 'bg-red-600': item.status === 'Watlist' ? 'bg-blue-600' : 'bg-green-500'} ${item.status === 'Join room' ? null : 'opacity-50'} text-white font-medium px-6 py-[3px] text-md cursor-pointer hover:bg-green-400`}>{item.status}</button></td>
                    <td className=''>
                        <span 
                         disabled={item.status === 'Ended' && true}
                        className={` ${item.status === 'Ended' && ' opacity-50'} bg-blue-400 text-blue-700 px-1 py-2 text-lg hover:text-blue-600 hover:bg-blue-300 transition-all ease-in-out duration-300 active:scale-90`}>
                          <CopyToClipboard onCopy={()=> {
                            setCopy(true)
                            toast.success("Link Copied succesfully")
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
            </>
        )
    }
   
    
    </>
  )
}

export default ManySchedule
