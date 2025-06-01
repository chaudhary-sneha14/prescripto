import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../Context/AdminContext';
import { AppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets_admin/assets.js';

const AllApointment = () => {
  const { aToken, getAllAppointments, appointment, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, []);

  return (
    <div className="w-full max-w-6xl m-5 px-2">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Header for sm and up */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b font-semibold bg-gray-50">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Appointment List */}
        {appointment.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-3 sm:gap-0 items-center text-gray-600 py-4 px-4 border-b hover:bg-gray-50"
          >
            {/* Index */}
            <p className="sm:block hidden">{index + 1}</p>

            {/* Patient */}
            <div className="flex items-center gap-2">
              <img className="w-8 h-8 rounded-full object-cover" src={item.userData.image} alt="patient" />
              <p className="truncate">{item.userData.name}</p>
            </div>

            {/* Age */}
            <p className="sm:block hidden">{calculateAge(item.userData.dob)}</p>

            {/* Date & Time */}
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            {/* Doctor */}
            <div className="flex items-center gap-2">
              <img className="w-8 h-8 rounded-full bg-gray-200 object-cover" src={item.docData.image} alt="doctor" />
              <p className="truncate">{item.docData.name}</p>
            </div>

            {/* Fees */}
            <p>{currency}{item.amount}</p>

            {/* Action */}
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-semibold">Cancelled</p>
            ) : item.isCompleted ? <p className='text-green-600 font-medium text-xs'> Completed</p> :(
              <img
                onClick={() => cancelAppointment(item._id)}
                className="w-6 sm:w-8 cursor-pointer"
                src={assets.cancel_icon}
                alt="cancel"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllApointment;
