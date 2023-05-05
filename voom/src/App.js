import React, {useState, useEffect} from 'react';
import { Rings } from  'react-loader-spinner'
import {Routes, Route, useMatches} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import CreateMeeting from './pages/CreateMeeting';
import Navbar from "./components/Navbar";
import OneMeeting from './pages/OneMeeting';
import { useLocation } from 'react-router-dom';
import GroupMeeting from './pages/GroupMeeting';
import OneSchedule from './pages/OneSchedule';
import ManySchedule from './pages/ManySchedule';
import Room from './pages/Room';


function App() {
  const [loading, setLoading] = useState(true)
  const [darkTheme, setdarkTheme ] = useState(false)
  const location = useLocation()

  const ChangeTheme = () => {
    setdarkTheme (!darkTheme)
    console.log(darkTheme)
  }

  useEffect(()=> {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000);
    return () => clearTimeout(timer);
  }, [])


  return (
    <>
     {location.pathname !== "/"  && (
        <Navbar ChangeTheme={ChangeTheme} LightTheme={darkTheme} />
      )}
    <div className={`${darkTheme === true ? 'bg-black text-white' : 'bg-slate-100 text-black'} h-screen`}>
      {
        loading ? (
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
          <div>
        
              <Routes>
                <Route  path="/" element={<Login/>}/>
                <Route path="/home" element={<Home darkTheme={darkTheme} />}/>
                <Route path="/create" element={<CreateMeeting darkTheme={darkTheme}/>}/>
                <Route path="/meeting" element ={<OneMeeting  darkTheme={darkTheme}/>} />
                <Route path="/meetings" element ={<GroupMeeting  darkTheme={darkTheme}/>} />
                <Route path="/schedule" element ={<OneSchedule  darkTheme={darkTheme}/>} />
                <Route path="/manyschedule" element ={<ManySchedule  darkTheme={darkTheme}/>} />
                <Route path="/room/:roomId" element ={<Room  darkTheme={darkTheme}/>} />
              </Routes>
  
         </div>
        )
      }
    </div>
    </>
  );
}

export default App;
