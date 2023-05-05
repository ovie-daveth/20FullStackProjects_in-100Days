import { getDocs, query, where } from 'firebase/firestore'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { userRef } from './firebaseConfig'

const FetchUser = () => {
    const [users, setUsers] = useState([])
    const {uid} = useSelector((state)=> state.user.value)
    
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

  return users
}

export default FetchUser
