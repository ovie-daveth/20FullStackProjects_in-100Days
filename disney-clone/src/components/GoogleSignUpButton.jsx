import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { app } from '../firebaseConfig'
import { useDispatch } from 'react-redux';
import { login } from '../states/reducers/userSlice';
import { toast } from 'react-toastify';


const GoogleSignUpButton = ({text, setIsLogin, setShowLogin}) => { //This props are from te header compoent to update the state when user is logged in

  const provider = new GoogleAuthProvider(); 
  const auth = getAuth(app);
  const dispatch = useDispatch()
   
    const GoogleSignUp = async (e) => {
      e.preventDefault()
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential.accessToken;
          // The signed-in user info.
          const {displayName, email, photoURL, uid} = result.user;
          const userData = { name: displayName, email: email, photoURL: photoURL, uid: uid };
          dispatch(login(userData))
          localStorage.setItem('user', JSON.stringify(userData));
          console.log("This is a signed in user", displayName)
          setIsLogin(true);
          setShowLogin(false)
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          toast.error(`Could not sign in ${email} due to`, errorCode, errorMessage)
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log(credential)
          // ...
        });
    }

  return (
    <p className='group bg-yellow-500 hover:bg-yellow-400 py-1 w-full text-slate-600 hover:text-slate-500 font-semibold flex items-center justify-between px-3 gap-2' onClick={GoogleSignUp}>{text} <span className='group-hover:bg-slate-100 text-xl rounded-full border-none bg-white p-1'><FcGoogle /></span></p>
  )
}

export default GoogleSignUpButton
