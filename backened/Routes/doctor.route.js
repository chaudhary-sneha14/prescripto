import express from 'express'
import { appointmentCancel, appointmentComplete, appointmentsDoctor, doctorDashboard, doctorList, doctorProfile, loginDoctor, updateDoctorProfile } from '../Controllers/doctor.controller.js';
import authDoctor from '../Middleware/authDoctor.js';

const route=express.Router();

route.get('/list',doctorList)
route.post('/login',loginDoctor)
route.get('/appointments', authDoctor, appointmentsDoctor);
route.post('/complete-appointment',authDoctor,appointmentComplete)
route.post('/cancel-appointment',authDoctor,appointmentCancel)
route.get('/dashboard',authDoctor,doctorDashboard)
route.get('/profile',authDoctor,doctorProfile);
route.post('/update-profile',authDoctor,updateDoctorProfile)





export default route;