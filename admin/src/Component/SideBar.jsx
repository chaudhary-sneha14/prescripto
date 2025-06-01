import React, { useContext } from 'react';
import { AdminContext } from '../Context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets';
import { DoctorContext } from '../Context/DoctorContext';

export default function SideBar() {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className='min-h-screen bg-white border-r'>
      {aToken && (
        <ul className='text-[#515151] mt-5'>

          <NavLink
            to='/admin-dashboard'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-indigo-100 border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.home_icon} alt='Home' />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to='/all-appointment'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-indigo-100 border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.appointment_icon} alt='Appointments' />
            <p className='hidden md:block'>Appointments</p>
          </NavLink>

          <NavLink
            to='/add-doctor'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-indigo-100 border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.add_icon} alt='Add Doctor' />
            <p className='hidden md:block'>Add Doctor</p>
          </NavLink>

          <NavLink
            to='/doctor-list'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-indigo-100 border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.people_icon} alt='Doctors List' />
            <p className='hidden md:block'>Doctors List</p>
          </NavLink>

        </ul>
      )}

      {dToken && (
        <ul className='text-[#515151] mt-5'>

          <NavLink
            to='/doctor-dashboard'  // fixed typo here
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-indigo-100 border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.home_icon} alt='Home' />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>

          <NavLink
            to='/doctor-appointment'  // fixed typo here
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-indigo-100 border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.appointment_icon} alt='Appointments' />
            <p className='hidden md:block'>Appointments</p>
          </NavLink>

          <NavLink
            to='/doctor-profile'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-indigo-100 border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.people_icon} alt='Doctor Profile' />
            <p className='hidden md:block'>Doctor Profile</p>
          </NavLink>

        </ul>
      )}
    </div>
  );
}
