
import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext= createContext();

export const DoctorContextProvider=({children})=>{

    const backendUrl =import.meta.env.VITE_BACKEND_URL
    const [dToken,setDToken]=useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
    const[appointments,setAppointments]=useState([])
    const[dashData,setDashData] = useState(false)
    const[profileData,setProfileData]=useState(false)

    const getAppointments = async()=>{
        try {
            const{data}=await axios.get(backendUrl + "/api/doctor/appointments",{headers:{dToken}})
            if(data.success){
                
                setAppointments(data.appointments.reverse())
                console.log(data.appointments.reverse());
                
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
                console.log(error.message);       
                toast.error(error.message)
            
        }
    }


    //----------------------------mark Complete appointment---------------------------------

    const completeAppointment=async(appointmentId)=>{
        try {

            const {data}=await axios.post(backendUrl + "/api/doctor/complete-appointment",{appointmentId},{headers:{dToken}})
            if(data.success){
                toast.success(data.message);
                getAppointments();
            }
            else{
                toast.error(data.message);
            }
            
        } catch (error) {
             console.log(error.message);       
             toast.error(error.message)
        }

    }


      //----------------------------mark Cancel appointment---------------------------------

    const cancelAppointment=async(appointmentId)=>{
        try {

            const {data}=await axios.post(backendUrl + "/api/doctor/cancel-appointment",{appointmentId},{headers:{dToken}})
            if(data.success){
                toast.success(data.message);
                getAppointments();
            }
            else{
                toast.error(data.message);
            }
            
        } catch (error) {
             console.log(error.message);       
             toast.error(error.message)
        }

    }


    //---------------------------Doctor Dashboard----------------------------------------

    const getDashData =async()=>{
        try {


            const {data}= await axios.get(backendUrl + '/api/doctor/dashboard',{headers:{dToken}})
            if(data.success){
                console.log(data.dashData);   
                setDashData(data.dashData)
            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
             console.log(error.message);       
             toast.error(error.message)
        }
    }

    //-----------------------------FETCH DOCTOR PROFILE-------------------------------------

    const getProfileData=async()=>{
        try {
            const {data}= await axios.get(backendUrl +'/api/doctor/profile', {headers:{dToken}})
            if(data.success){
                setProfileData(data.profileData)
                console.log(data.profileData);
                
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message);       
             toast.error(error.message)
        }
    }

    


    const value={dToken,setDToken,backendUrl,appointments,setAppointments,getAppointments,
        completeAppointment,cancelAppointment,getDashData,dashData,setDashData,getProfileData,profileData,setProfileData}

    return(
        <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
    )
}