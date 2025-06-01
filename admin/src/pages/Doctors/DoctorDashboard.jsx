import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../Context/DoctorContext";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../Context/AppContext";

const DoctorDashboard = () => {
  const { dashData, dToken, getDashData,completeAppointment,cancelAppointment } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="m-5">
        {/* Summary Cards */}
        <div className="flex flex-wrap gap-4">
          {/* Earning */}
          <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded border-2 border-gray-100 hover:scale-105 transition-all cursor-pointer">
            <img className="w-14" src={assets.earning_icon} alt="Earning Icon" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {currency} {dashData.earning}
              </p>
              <p className="text-gray-400">Earning</p>
            </div>
          </div>

          {/* Appointments */}
          <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded border-2 border-gray-100 hover:scale-105 transition-all cursor-pointer">
            <img className="w-14" src={assets.appointment_icon} alt="Appointment Icon" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          {/* Patients */}
          <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded border-2 border-gray-100 hover:scale-105 transition-all cursor-pointer">
            <img className="w-14" src={assets.patients_icon} alt="Patients Icon" />
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
                  <p className="text-red-600 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-600 text-xs font-medium">Completed</p>
                ) : (
                  <div className="flex gap-2">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-6 h-6 cursor-pointer hover:scale-110 transition duration-200"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-6 h-6 cursor-pointer hover:scale-110 transition duration-200"
                      src={assets.tick_icon}
                      alt="Complete"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
