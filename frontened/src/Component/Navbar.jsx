import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';
import { useContext, useState } from 'react';
import { AppContext } from './Context/AppContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const {token, setToken,userData} = useContext(AppContext)
  const [showDropdown, setShowDropdown] = useState(false);

  const linkStyle = ({ isActive }) =>
    `py-1 hover:text-primary transition ${
      isActive ? 'text-primary font-semibold' : ''
    }`;



    const logout=()=>{
    setToken(false)
    localStorage.removeItem('token')
    }

  return (
    <div className='flex items-center justify-between px-4 sm:px-8 text-sm py-4 mb-5 border-b border-gray-300 bg-white z-30 relative'>
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        className='w-36 sm:w-44 cursor-pointer'
        src={assets.logo}
        alt='logo'
      />

      {/* Desktop Nav Links */}
      <ul className='hidden md:flex items-center gap-6 font-medium'>
        <NavLink to='/' className={linkStyle}>
          <li className='py-1'>HOME</li>
        </NavLink>
        <NavLink to='/doctors' className={linkStyle}>
          <li className='py-1'>ALL DOCTORS</li>
        </NavLink>
        <NavLink to='/about' className={linkStyle}>
          <li className='py-1'>ABOUT</li>
        </NavLink>
        <NavLink to='/contact' className={linkStyle}>
          <li className='py-1'>CONTACT</li>
        </NavLink>
      </ul>

      {/* Right Side - Profile or Button */}
      <div className='flex items-center gap-4'>
        {token && userData ? (
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            {/* Profile Trigger */}
            <div className="flex items-center gap-2 cursor-pointer">
              <img className="w-8 rounded-full" src={userData.image} alt="Profile" />
              <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown Icon" />
            </div>

            {/* Dropdown */}
            <div
              className={`absolute right-0 top-full mt-2 min-w-[12rem] bg-stone-100 rounded p-4 flex flex-col gap-4 shadow-lg z-50 transition-all duration-200 ${
                showDropdown ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              <p onClick={() => navigate('/my-profile')} className="cursor-pointer hover:text-black text-gray-600">
                My Profile
              </p>
              <p onClick={() => navigate('/my-appointment')} className="cursor-pointer hover:text-black text-gray-600">
                My Appointment
              </p>
              <p onClick={logout} className="cursor-pointer hover:text-black text-gray-600">
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-primary text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-light hidden md:block'
          >
            Create account
          </button>
        )}

        {/* Mobile Menu Button */}
        <img
          onClick={() => setShowMenu(true)}
          className='w-6 md:hidden cursor-pointer'
          src={assets.menu_icon}
          alt='menu'
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-40 w-64 shadow-lg transform transition-transform duration-300 ease-in-out ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between px-5 py-5 border-b'>
          <img className='w-32' src={assets.logo} alt='logo' />
          <img
            className='w-6 cursor-pointer'
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt='close'
          />
        </div>
        <ul className='flex flex-col px-6 pt-6 gap-4 text-base font-medium text-gray-700'>
         <NavLink onClick={() => setShowMenu(false)} to='/' >
            <li><p className='px-4 py-2 rounded inline-block'>HOME</p></li>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/doctors' >
            <li><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></li>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/about' >
            <li><p className='px-4 py-2 rounded inline-block'>ABOUT</p></li>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/contact' >
            <li><p className='px-4 py-2 rounded inline-block'>CONTACT</p></li>
          </NavLink>
          {!token && (
            <button
              onClick={() => {
                setShowMenu(false);
                navigate('/login');
              }}
              className='mt-4 bg-primary text-white px-6 py-2 rounded-full font-light w-full'
            >
              Create account
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};
