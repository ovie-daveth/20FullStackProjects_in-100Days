import React from 'react'
import gif from '../assets/animation.gif'
import {app, userRef} from '../firebaseConfig.js'
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { login } from '../strore/user';
import { addDoc, getDocs, query, where } from 'firebase/firestore';


const Login = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const nav = useNavigate()
    const dispatch = useDispatch()

    
  const loginGoogle = async () => {
    const {user: {displayName, email, photoURL, uid},} = await signInWithPopup(auth, provider)
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        const userData = { name: displayName, email: email, photoURL: photoURL, uid: uid };
        localStorage.setItem('user', JSON.stringify(userData));
        dispatch(login(userData));
       
        toast.success(`${displayName} signed in successfully`);
        if(email){
          const storeQuery = query(userRef, where("uid", "==", uid));
          const fetchUsers = await getDocs(storeQuery);
          if(fetchUsers.docs.length === 0){
            await addDoc(userRef, {
              uid,
              name: displayName,
              email: email,
              photoURL: photoURL
            })
          }
        }
        nav('/home');

      
  };
    return (
        <div className="w-full h-screen relative bg-black lg:px-24 md:px-12 px-0">
            <div className="bg-[#1d1b1b]  lg:w-[80%] md:h-[500px] h-screen md:translate-y-[2rem] md:absolute lg:left-[10%] md:left-[3%] lg:top-[10%] md:top-[20%] md:-translate-[50%] shadow-lg flex flex-col md:flex-row items-center md:justify-between lg:px-10 px-5 py-[4rem] md:py-[unset] ">
                <img src={gif} alt="animation" className="md:w-[50%]" />
                <div className="block md:w-[45%] w-[100%] text-center">
                    <h1 className="text-blue-800 font-bold text-6xl">VOOM</h1>
                    <h3 className="my-4 font-semibold text-white text-xl">One Platform to <span className="text-red-700">connect</span> </h3>
                    <button onClick={loginGoogle} className="bg-[blue] border-none w-full py-3 text-white font-semibold cursor-pointer hover:bg-blue-800 transition-all ease-in-out duration-400 active:bg-blue-900">Login With Google</button>
                </div>
            </div>
        </div>
    )

}


export default Login