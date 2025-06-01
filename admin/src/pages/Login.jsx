import React, { useContext, useState } from 'react'
import { AdminContext } from '../Context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../Context/DoctorContext';
// import {assets} from '../assets/assets_admin/assets.js'

export const Login=()=>{
    const[state,setState]=useState('Admin');
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')


    const{setAToken,backenedUrl}=useContext(AdminContext)
    const{setDToken,dToken}=useContext(DoctorContext)


    const onSubmitHandler=async(e)=>{
        e.preventDefault()

        try {
       if(state==='Admin'){

        const{data}= await axios.post(backenedUrl + '/api/admin/login',{email,password})
        if(data.success){
            console.log(data.token);  //we will get token which we set in admin login in backened
            localStorage.setItem('aToken',data.token)
            setAToken(data.token)         
        }
        else{
          toast.error(data.message)
        }
      }
       else{

        const {data} =await axios.post(backenedUrl + '/api/doctor/login',{email,password})
         if(data.success){
            console.log(data.token);  //we will get token which we set in doctor login in backened
            localStorage.setItem('dToken',data.token)
            setDToken(data.token)  
            console.log(data.token);
            
         }
          else{
          toast.error(data.message)
        }
    }
        } catch (error) {
            console.log(error);
            
        }

    }


  return (
   <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center px-4 sm:px-0">
  <div className="flex flex-col gap-3 mx-auto items-start p-6 sm:p-8 w-full max-w-md border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
    <p className="text-2xl font-semibold mx-auto">
      <span className="text-primary">{state}</span> Login
    </p>

    <div className="w-full">
      <p>Email</p>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="border border-[#DADADA] rounded w-full p-2 mt-1"
        type="email"
        required
      />
    </div>

    <div className="w-full">
      <p>Password</p>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="border border-[#DADADA] rounded w-full p-2 mt-1"
        type="password"
        required
      />
    </div>

    <button className="w-full text-white bg-primary py-2 rounded-md text-base">
      Login
    </button>

    {state === "Admin" ? (
      <p>
        Doctor Login?{" "}
        <span
          className="text-primary cursor-pointer underline"
          onClick={() => setState("Doctor")}
        >
          Click here
        </span>
      </p>
    ) : (
      <p>
        Admin Login?{" "}
        <span
          className="text-primary cursor-pointer underline"
          onClick={() => setState("Admin")}
        >
          Click here
        </span>
      </p>
    )}
  </div>
</form>

  )
}
