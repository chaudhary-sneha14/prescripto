import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../Context/DoctorContext'
import { AppContext } from '../../Context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {
  const {getProfileData,profileData,setProfileData,dToken,backendUrl} = useContext(DoctorContext)
  const{currency}=useContext(AppContext)

  const[isEdit,setIsEdit]=useState(false)

  const updateProfile=async()=>{
    try {
      const updateData = {
        address:profileData.address,
        fees:profileData.fees,
        available:profileData.available
      }
      const {data} = await axios.post(backendUrl + "/api/doctor/update-profile",updateData,{headers:{dToken}})
      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData();
      }
      else{
      toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)

      
    }
  }

  useEffect(()=>{
    if(dToken){
      getProfileData()
    }
  },[dToken])


  return profileData && (
    <div>

     <div className="flex flex-col sm:flex-row gap-6 m-5">
  <div>
    <img className="bg-primary/80 w-full sm:w-64 rounded-xl shadow-md" src={profileData.image} alt="" />
  </div>

  <div className="flex-1 border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
    <p className="flex items-center gap-2 text-2xl sm:text-3xl font-semibold text-gray-800">
      {profileData.name}
    </p>

    <div className="flex flex-wrap items-center gap-2 mt-2 text-gray-600">
      <p>{profileData.degree} - {profileData.speciality}</p>
      <button className="py-0.5 px-3 border text-xs rounded-full bg-gray-100">{profileData.experience}</button>
    </div>

    <div className="mt-4">
      <p className="text-sm font-semibold text-gray-800">About:</p>
      <p className="text-sm text-gray-600 mt-1 max-w-prose leading-relaxed">
        {profileData.about}
      </p>
    </div>

    <p className="text-gray-600 font-medium mt-4">
      Appointment fee: 
      <span className="text-gray-800 ml-2">
        {currency}{" "}
        {isEdit ? (
          <input
            type="number"
            className="border px-2 py-1 rounded w-24 text-sm"
            onChange={(e) =>
              setProfileData((prev) => ({ ...prev, fees: e.target.value }))
            }
            value={profileData.fees}
          />
        ) : (
          profileData.fees
        )}
      </span>
    </p>

    <div className="flex flex-col gap-1 py-4 text-sm">
      <p className="font-medium">Address:</p>
      <div className="pl-2">
        {isEdit ? (
          <>
            <input
              type="text"
              className="border px-2 py-1 rounded w-full mb-1"
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value },
                }))
              }
              value={profileData.address.line1}
            />
            <input
              type="text"
              className="border px-2 py-1 rounded w-full"
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value },
                }))
              }
              value={profileData.address.line2}
            />
          </>
        ) : (
          <p className="text-gray-600">
            {profileData.address.line1}
            <br />
            {profileData.address.line2}
          </p>
        )}
      </div>
    </div>

    <div className="flex items-center gap-2">
      <input
        onChange={() =>
          isEdit && setProfileData((prev) => ({ ...prev, available: !prev.available }))
        }
        checked={profileData.available}
        type="checkbox"
        className="accent-primary"
      />
      <label className="text-sm">Available</label>
    </div>

    {isEdit ? (
      <button
        onClick={updateProfile}
        className="px-5 py-2 mt-6 border border-primary text-sm rounded-full hover:bg-primary hover:text-white transition"
      >
        Save
      </button>
    ) : (
      <button
        onClick={() => setIsEdit(true)}
        className="px-5 py-2 mt-6 border border-primary text-sm rounded-full hover:bg-primary hover:text-white transition"
      >
        Edit
      </button>
    )}
  </div>
</div>

      
    </div>
  )
}

export default DoctorProfile
