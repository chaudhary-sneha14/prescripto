import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './Context/AppContext'
import { useNavigate } from 'react-router-dom'

export default function RelatedDoctors({speciality,docId}) {

    const{doctors}=useContext(AppContext)
    const navigate=useNavigate();

    const[relDoc,setRelDoc]=useState([])

    useEffect(()=>{
        if(doctors.length>0 && speciality){
            const doctorsData= doctors.filter((doc)=> doc.speciality===speciality && doc._id!==docId)  //except current doctor display all
            setRelDoc(doctorsData)
        }
    },[doctors,speciality,docId])

    
  return (
  <div className='flex flex-col items-center gap-4 my-16 text-gray-900 px-4 md:px-10'>
    <h1 className='text-3xl font-medium text-center'>Top Doctors to Book</h1>
    <p className='w-full sm:w-2/3 md:w-1/3 text-center text-sm'>
      Simply browse through our extensive list of trusted doctors.
    </p>

    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-5'>
      {relDoc.slice(0, 5).map((item, index) => (
        <div
          onClick={() => {
            navigate(`/appointment/${item._id}`);
            scrollTo(0, 0);
          }}
          key={index}
          className='border border-blue-200 cursor-pointer rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-300'
        >
          <img className='w-full h-70 object-cover bg-blue-50' src={item.image} alt={item.name} />
          <div className='p-4'>
            <div className='flex items-center gap-2 text-sm text-green-500 mb-1'>
      <span className={`w-2 h-2 ${item.available? ' bg-green-500': 'bg-gray-500'} rounded-full`}></span>
      <p className={` ${item.available? ' text-green-500': 'text-gray-500'}`}>{item.available?'Availabel':'Not Availabel'}</p>
    </div>
            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
            <p className='text-gray-600 text-sm'>{item.speciality}</p>
          </div>
        </div>
      ))}
    </div>

    <button
      onClick={() => {
        navigate('/doctors');
        scrollTo(0, 0);
      }}
      className='bg-blue-50 text-gray-600 px-8 py-3 rounded-full mt-10 hover:bg-blue-100 transition'
    >
      More
    </button>
  </div>
);}