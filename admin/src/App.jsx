import { useContext } from "react";
import { Login } from "./pages/Login.jsx";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./Context/AdminContext.jsx";
import Navbar from "./Component/Navbar.jsx";
import SideBar from "./Component/SideBar.jsx";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AllAppointment from "./pages/admin/AllApointment.jsx"; // Consider renaming file too
import AddDoctor from "./pages/admin/AddDoctor.jsx";
import DoctorList from "./pages/admin/DoctorList.jsx";
import { DoctorContext } from "./Context/DoctorContext.jsx";
import DoctorDashboard from "./pages/Doctors/DoctorDashboard.jsx";
import DoctorAppointment from "./pages/Doctors/DoctorAppointment.jsx";
import DoctorProfile from "./pages/Doctors/DoctorProfile.jsx";

export const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return aToken || dToken ? (
    <div className="bg-indigo-50">
      <ToastContainer />
      <Navbar />

      <div className="flex items-start">
        <SideBar />
        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointment" element={<AllAppointment />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorList />} />

          {/* Doctor Routes */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointment" element={<DoctorAppointment />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};
