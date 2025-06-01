import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../Context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../Context/AppContext";

const Dashboard = () => {
  const { aToken, cancelAppointment, getDashData, dashData } =useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        {/* Summary Cards */}
        <div className="flex flex-wrap gap-4">
          {/* Doctors */}
          <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded border-2 border-gray-100 hover:scale-105 transition-all cursor-pointer">
            <img className="w-14" src={assets.doctor_icon} alt="Doctor Icon" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>

          {/* Appointments */}
          <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded border-2 border-gray-100 hover:scale-105 transition-all cursor-pointer">
            <img
              className="w-14"
              src={assets.appointment_icon}
              alt="Appointment Icon"
            />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          {/* Patients */}
          <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded border-2 border-gray-100 hover:scale-105 transition-all cursor-pointer">
            <img
              className="w-14"
              src={assets.patients_icon}
              alt="Patients Icon"
            />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Appointments */}
          <div className="bg-white mt-10 rounded border">
               <div className="flex items-center gap-3 px-4 py-4 border-b">
                 <img src={assets.list_icon} alt="List Icon" />
                 <p className="font-semibold text-lg">Latest Bookings</p>
               </div>
     
               <div className="pt-4 px-4 pb-2 space-y-4">
                 {dashData.latestAppointments.map((item, index) => (
                   <div
                     key={index}
                     className="flex items-center justify-between p-3 rounded hover:bg-gray-200"
                   >
                     <div className="flex items-center gap-3">
                       <img
                         className="w-10 h-10 rounded-full"
                         src={item.userData?.image}
                         alt="User"
                       />
                       <div>
                         <p className="font-medium">{item.userData?.name}</p>
                         <p className="text-sm text-gray-500">
                           {slotDateFormat(item.slotDate)}
                         </p>
                       </div>
                     </div>
     
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
      </div>
    )
  );
};

export default Dashboard;
