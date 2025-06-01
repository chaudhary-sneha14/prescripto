
import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AdminContext= createContext();

export const AdminContextProvider=({children})=>{

const[aToken,setAToken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
const[doctors,setDoctors]=useState([])
const[appointment,setAppointment]=useState([])
const[dashData,setdashData]=useState(false)

const backenedUrl=import.meta.env.VITE_BACKEND_URL;

//------------------------------------ getAllDoctors-------------------------------------------------------

const getAllDoctors=async()=>{
    try {
        const {data}=await  axios.post(backenedUrl + '/api/admin/all-doctors',{},{headers:{aToken}})
        if(data.success){
            setDoctors(data.doctors)
            console.log(data.doctors);
            
        }
        else{
            toast.error(data.message)
        }
        
    } catch (error) {
        toast.error(error.message)
    }
}


//--------------------------------------changeAvailability-----------------------------------------------------

const changeAvailability=async(docId)=>{
    try {
        const {data}= await axios.post(backenedUrl + '/api/admin/change-availability',{docId},{headers:{aToken}})
        if(data.success){
            toast.success(data.message)
            getAllDoctors()
        }
        else{
            toast.error("error"+data.message)
        }

    } catch (error) {
        toast.error(error.message)
    }
}


//---------------------display All Appointment-----------------

const getAllAppointments = async()=>{
    try {
        const  {data}=await axios.get(backenedUrl + '/api/admin/appointments',{headers:{aToken}})
        if(data.success){
           
            
            setAppointment(data.appointment)
             console.log(data.appointment);
        }
        else{
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error);
          toast.error(error.message)
        
    }
}


// -------------------------Cancel Appointment------------------


const cancelAppointment =async(appointmentId)=>{
try {
    
const {data}=await axios.post(backenedUrl + '/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})
if(data.success){
    toast.success(data.message)
    getAllAppointments()
}
else{
    toast.error(data.message)
}

} catch (error) {
    console.log(error);
          toast.error(error.message)
}
}


//-------------------------Dashboard--------------------------

const getDashData = async ()=>{
    try {

        const {data}= await axios.get(backenedUrl + '/api/admin/dashboard',{headers:{aToken}})
        if(data.success){
            console.log(data);
            
            setdashData(data.dashData)
            console.log(data.dashData);
            
        }
        else{
            toast.error(data.message)
        }
        
    } catch (error) {
        console.log(error);
          toast.error(error.message)
    }
}




    const value={
        aToken,setAToken,backenedUrl,getAllDoctors,doctors,changeAvailability,getAllAppointments,appointment,setAppointment
        ,cancelAppointment,getDashData,dashData,setdashData
    }

    return(
        <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
    )
}