import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../Context/DoctorContext';
import { AppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets_admin/assets';

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments,completeAppointment,cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className='w-full max-w-6xl mx-auto my-6 px-4 sm:px-6 lg:px-8'>
      <h2 className='mb-4 text-2xl font-bold text-gray-800'>All Appointments</h2>

      <div className='bg-white rounded-2xl shadow-md p-4 sm:p-6 text-sm max-h-[80vh] min-h-[50vh] overflow-y-auto'>

        {/* Table Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_2.5fr_1fr_1fr] gap-4 py-3 px-4 border-b border-gray-200 font-medium text-gray-700'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointments List */}
        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className='flex flex-wrap sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_2.5fr_1fr_1fr] gap-4 items-center text-gray-700 py-3 px-4 border-b border-gray-100 hover:bg-gray-100 transition duration-200 ease-in-out rounded-md'
          >
            <p className='hidden sm:block'>{index + 1}</p>

            {/* Patient Info */}
            <div className='flex items-center gap-2'>
              <img className='w-8 h-8 rounded-full object-cover' src={item.userData.image} alt='Patient' />
              <p className='font-medium'>{item.userData.name}</p>
            </div>

            {/* Payment */}
            <span className={`text-xs px-2 py-0.5 rounded-full border 
              ${item.payment ? 'bg-green-100 text-green-700 border-green-300' : 'bg-yellow-100 text-yellow-700 border-yellow-300'}`}>
              {item.payment ? 'Online' : 'Cash'}
            </span>

            <p className='hidden sm:block'>{calculateAge(item.userData.dob)}</p>
            <p className='text-sm'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <p>{currency}{item.amount}</p>
            {
              item.cancelled
              ?<p className='text-red-600 text-xs font-medium'>Cancelled</p>
              :item.isCompleted
              ?<p className='text-green-600 text-xs font-medium'>Completed</p>
             :<div className='flex gap-2'>
              <img onClick={()=>cancelAppointment(item._id)} className='w-6 h-6 cursor-pointer hover:scale-110 transition duration-200' src={assets.cancel_icon} alt='Cancel' />
              <img onClick={()=>completeAppointment(item._id)} className='w-6 h-6 cursor-pointer hover:scale-110 transition duration-200' src={assets.tick_icon} alt='Complete' />
            </div>

            }

           
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
