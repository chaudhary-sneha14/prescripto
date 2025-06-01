import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom'

export const MyAppointment = () => {
  const { backendUrl,token ,getDoctorsData} = useContext(AppContext);

  const[appointment,setAppointment]=useState([])
 const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 const navigate =useNavigate()

 const slotDateFormat = (slotDate)=>{
  const dateArray=slotDate.split("_")
  return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2];
 }


  const getUserAppointment=async()=>{
    try {
      const {data}=await axios.get(backendUrl + "/api/user/appointments",{headers:{token}})
  
      if(data.success){
        setAppointment(data.appointment.reverse())
        console.log(data.appointment);
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }


  //------------------------------------CACEL APPOINTMENT-----------------------------------------------------

  const cancelAppointment = async(appointmentId)=>{
    try {
      const {data}= await axios.post(backendUrl + '/api/user/cancel-appointment',{appointmentId},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        getUserAppointment()
        getDoctorsData()
      }
      else{
      toast.error(data.message);

      }
      
    } catch (error) {
        console.log(error);
      toast.error(error.message);
    }

  }

    //-----------------------------payment--------------------


    const initPay=(order)=>{
      const options={
        key:import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount:order.amount,
        currency:order.currency,
        name:'Appointment Payment',
        description:'Appointment Payment',
        order_id:order.id,
        receipt:order.receipt,
        handler:async(response)=>{
        console.log(response);

        try {

          const {data}=await axios.post(backendUrl + "/api/user/verifyRazorpay",response,{headers:{token}})

          if(data.success){
           getUserAppointment()
           navigate('/my-appointment')
          }
          
        } catch (error) {
           console.log(error);
      toast.error(error.message);
        }
        
        }
      }
      const rzp=new window.Razorpay(options)
      rzp.open()


    }

    const appointmentRazorpay =async(appointmentId)=>{

      try {

        const {data}= await axios.post(backendUrl + "/api/user/payment-razorpay",{appointmentId},{headers:{token}})
        if(data.success){
          initPay(data.order)
          
        }
        
      } catch (error) {
         console.log(error);
      toast.error(error.message);
      }
    }
  



  useEffect(()=>{
    if(token){
      getUserAppointment();
    }
  },[token])

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Appointments</h2>
      <div className="space-y-6">
        {appointment.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-6 p-4 border rounded-lg shadow-sm bg-white"
          >
            {/* Doctor Image */}
            <div className="flex-shrink-0">
              <img
                className="w-32 h-32 object-cover rounded bg-indigo-50"
                src={item.docData.image}
                alt={item.docData.name}
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1 text-sm text-zinc-600 space-y-1">
              <p className="text-lg text-neutral-800 font-semibold">{item.docData.name}</p>
              <p className="text-indigo-600">{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-2">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-2">
                <span className="text-sm font-medium text-neutral-700">Date & Time:</span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>


            {/* --------------active button------------- */}

     <div className="flex flex-col justify-center gap-2 min-w-[10rem]">
      {!item.cancelled && item.payment && !item.isCompleted && <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">Paid</button>}
      {!item.cancelled && !item.payment && !item.isCompleted && 
  <button onClick={()=>appointmentRazorpay(item._id)}
    className="w-full text-sm text-stone-500 py-2 border border-stone-300 rounded
               hover:bg-primary hover:text-white
               focus:bg-primary focus:text-white
               active:bg-primary active:text-white
               transition-colors duration-200"
  >
    Pay Online
  </button>}

  {!item.cancelled && !item.isCompleted && 
  <button
  onClick={()=>cancelAppointment(item._id)}
    className="w-full text-sm text-stone-500 py-2 border border-stone-300 rounded
               hover:bg-red-600 hover:text-white
               focus:bg-red-600 focus:text-white
               active:bg-red-600 active:text-white
               transition-colors duration-200"
  >
    Cancel Appointment
  </button>
}
{item.cancelled && !item.isCompleted && <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">AppontmentCancelled</button>}
{item.isCompleted &&  <button className="sm::min-w-48 py-2 border border-green-500 rounded text-green-500">Completed</button>}
</div>
          </div>
        ))}
      </div>
    </div>
  );
};
