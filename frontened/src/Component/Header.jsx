import { assets } from "../assets/assets_frontend/assets"

export const Header = () => {
  return (
    <div className="flex flex-col md:flex-row bg-primary rounded-xl px-4 md:px-6 lg:px-10 py-8 md:py-12 max-w-screen-lg mx-auto">
      {/* __________ Left Side __________ */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-3 py-4 md:py-6 mx-auto">
        <p className="text-2xl md:text-3xl text-white font-semibold leading-snug">
          Book Appointment <br /> With Trusted Doctors
        </p>

        <div className="flex flex-col items-center md:flex-row gap-3 text-white text-sm font-light">
          <img className="w-24" src={assets.group_profiles} alt="Profiles" />
          <p className="text-center md:text-left">
            Browse trusted doctors,
            <br className="hidden sm:block" />
            and book your appointment easily.
          </p>
        </div>

        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white px-5 mt-5 py-2.5 rounded-full text-gray-700 text-sm hover:scale-105 transition-transform duration-300"
        >
          Book Appointment
          <img className="w-3" src={assets.arrow_icon} alt="Arrow" />
        </a>
      </div>

      {/* __________ Right Side __________ */}
     <div className="md:w-1/2 relative min-h-[250px] flex items-end justify-center">
     <img
     className="absolute bottom-0 w-full max-h-[280px] rounded-lg object-contain"
     src={assets.header_img}
     alt="Header"
    />
    </div> 
    </div>
  )
}
