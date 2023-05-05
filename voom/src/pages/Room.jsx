import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { meetingRef } from '../firebaseConfig'
import { getDocs, query, where } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import uuid from 'react-uuid'

const Room = ({darkTheme}) => {
  const {roomId} = useParams()
  const [isAllowed, setIsAllowed] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const {uid, name} = useSelector((store)=> store.user.value)
  const nav = useNavigate()
  console.log("This is the user name", name)
  
  useEffect(() => {
    
    setUserLoaded(true)
    const getMeetingData = async () => {
      if (roomId && userLoaded) {
        const firestoreQuery = query(
          meetingRef,
          where("meetingId", "==", roomId)
        );
        const fetchedMeetings = await getDocs(firestoreQuery);
        if (fetchedMeetings.docs.length) {
          const meeting = fetchedMeetings.docs[0].data();
          // const isCreator = meeting?.createdBY === uid;
          const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
          const date = new Date();
          const meetingDate = date.toLocaleDateString('en-US', options).replace(/\//g, '-');
          console.log("My friend", meeting.invitedUsers)
          if (meeting.type === "1-on-1") {
              if(meeting.date === meetingDate){
                setIsAllowed(true)
                console.log("Meeting is holding")
              }else if(meeting.date < meetingDate){
                  toast.error("Meeting has ended")
                  nav("/home")
              }else if(meeting.date > meetingDate){
                toast.error(`Meeting is on ${meeting.date}`)
                nav("/home")
              }
           
          } else if(meeting.type === 'closed-Group'){
            if(meeting.invitedUsers.length <= 20){
              if(meeting.date === meetingDate){
                setIsAllowed(true)
                console.log("Meeting is holding")
              }else if(meeting.date < meetingDate){
                  toast.error("Meeting has ended")
                  nav("/home")
              }else if(meeting.date > meetingDate){
                toast.error(`Meeting is on ${meeting.date}`)
                nav("/home")
              }
            } else if(meeting.invitedUsers.length >= 20){
              toast.error("You are not invited for this meeting")
              nav("/home")
            }
          }else if(meeting.type === 'Anyone-can-join'){
            if(meeting.date === meetingDate){
              setIsAllowed(true)
              console.log("Meeting is holding")
            }else if(meeting.date < meetingDate){
                toast.error("Meeting has ended")
                nav("/home")
            }else if(meeting.date > meetingDate){
              toast.error(`Meeting is on ${meeting.date}`)
              nav("/home")
            }
          } else{
            setIsAllowed(true)
          }
        }
    }
  
  }
  getMeetingData()
  },[roomId, userLoaded, nav, uid])

  const app_ID = 1845378615;
  const secret = 'c10d97e8b0b7d7a34d0c1971841e9091';
  const myMeeting = async (element) => {
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(
      parseInt(app_ID),
      secret,
      roomId,
      uid ? uid : uuid(),
      name ? name : uuid()
    );
    const room = ZegoUIKitPrebuilt.create(kitToken);

    room.joinRoom ({
      container: element,
      maxUsers: 50,
      sharedLinks: [
        {
          name: "Personal link",
          url: window.location.origin,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });

  };
  function handleGoBack() {
    navigator.mediaDevices.getUserMedia({ audio: false, video: false })
    window.history.back();
  }

  return (
    <>
    <div className={`${darkTheme ? 'bg-black': 'bg-white'} py-2 w-full`}>
      <button onClick={handleGoBack} className="md:text-lg text-sm font-semibold px-2 py-1 bg-blue-600 rounded-lg text-white">Go back</button>
    </div>
    {
      isAllowed && (
        <div className='' ref={myMeeting} style={{width: "100%", height: "100vh"}}  >
      
      </div>
      )
    }
    </>
  )
}

export default Room

