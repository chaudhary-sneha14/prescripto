import { createContext } from "react";
// import { doctors } from "../../assets/assets_frontend/assets";
import axios from 'axios';
import { useState } from "react";
import {toast} from 'react-toastify'
import { useEffect } from "react";


export const AppContext=createContext();

export const AppContextProvider=({children})=>{

const currencySymbol = '$'
const backendUrl=import.meta.env.VITE_BACKEND_URL
const[doctors,setDoctors]=useState([])
const[token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false)//user token
const[userData,setUserData]=useState(false)


const getDoctorsData=async()=>{
    try {
        const {data}=await axios.get(backendUrl + "/api/doctor/list")
        if(data.success){
         setDoctors(data.doctors)
        }
        else{
            toast.error(data.message)
        }

    } catch (error) {
       toast.error(error.message)
    }
}

const loadUserProfileData=async()=>{
    try {

        const {data}=await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}})

         if (data.success) {
        const parsedUserData = {
        ...data.userData,
        address: typeof data.userData.address === 'string'
          ? JSON.parse(data.userData.address)
          : data.userData.address
      };

      setUserData(parsedUserData);
      console.log("userData.address", parsedUserData.address);
    }
        else{
            toast.error(data.message)
        }
        
    } catch (error) {
       toast.error(error)
        
    }
}

useEffect(()=>{
    getDoctorsData()
},[])

useEffect(()=>{
if(token){
    loadUserProfileData()
}
else{
    setUserData(false)
}
},[token])


const value={doctors,currencySymbol,token,setToken,backendUrl,getDoctorsData,userData,setUserData,loadUserProfileData}


    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    )
}