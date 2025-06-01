import { Route, Routes } from "react-router-dom"
import { Home } from "./Component/Pages/Home"
import { Doctor } from "./Component/Pages/Doctor"
import { Login } from "./Component/Pages/Login"
import { Contact } from "./Component/Pages/Contact"
import { MyProfile } from "./Component/Pages/MyProfile"
import { Appointment } from "./Component/Pages/Appointment"
import { MyAppointment } from "./Component/Pages/MyAppointment"
import { About } from "./Component/Pages/About"
import { Navbar } from "./Component/Navbar"
import Footer from "./Component/Footer"
import { ToastContainer } from 'react-toastify';


export const App=()=>{
  return(
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/doctors" element={<Doctor/>}/>
        <Route path="/doctors/:speciality" element={<Doctor/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/my-profile" element={<MyProfile/>}/>
        <Route path="/my-appointment" element={<MyAppointment/>}/>
        <Route path="/appointment/:docId" element={<Appointment/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}